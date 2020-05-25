import React, { Component } from 'react';
import { Grid, Card, CardContent, Button } from '@material-ui/core';
import ReactFileReader from 'react-file-reader';
import { Editor } from '@tinymce/tinymce-react';
import Alert from '../../components/UI/Alert';
import Input from '../../components/UI/Input';
import validate from '../../utils/validation';
import { tinymce_variables } from '../../utils/constants';

class NewArticle extends Component {
  state = {
    form: {
      title: {
        elementType: 'TextField',
        elementConfig: {
          type: 'text',
          name: 'title',
          label: 'Title',
          variant: 'outlined',
          size: 'small',
          fullWidth: true
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        helperText: ''
      }
    },
    body: '',
    fileImg: '',
    image: ''
  };

  inputChangeHandler = (event, inputName) => {
    const updatedForm = {
      ...this.state.form,
      [inputName]: {
        ...this.state.form[inputName],
        value: event.target.value,
        valid: validate(
          event.target.value,
          this.state.form[inputName].validation
        ).isValid,
        touched: true,
        helperText: validate(
          event.target.value,
          this.state.form[inputName].validation
        ).message
      }
    };
    this.setState({ form: updatedForm });
  };

  handleEditorChange = content => {
    this.setState({ body: content });
  };

  handleFiles = files => {
    const data = files ? files.fileList[0] : '';
    this.setState({ image: files || '', fileImg: data });
  };

  render() {
    const formElementsArray = [];
    for (const key in this.state.form) {
      formElementsArray.push({
        id: key,
        config: this.state.form[key]
      });
    }

    const form = formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        onChange={event => this.inputChangeHandler(event, formElement.id)}
        valid={formElement.config.valid}
        touched={formElement.config.touched}
        helperText={formElement.config.helperText}
      />
    ));

    return (
      <div className="container">
        <Grid container justify="center">
          <Grid item xs={12} sm={8} xl={6}>
            <Card className="new-article-card">
              <CardContent>
                <h2>Create New Article</h2>
                <Alert />
                <form>
                  <ReactFileReader handleFiles={this.handleFiles} base64>
                    <button type="button" className="btn btn-secondary">
                      <i className="fas fa-camera"></i>Add Image
                    </button>
                  </ReactFileReader>
                  {this.state.fileImg ? (
                    <div className="image-container">
                      <img src={this.state.image.base64} alt="" />
                    </div>
                  ) : null}
                  {form}
                  <Editor
                    apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
                    init={{
                      height: 500,
                      menubar: true,
                      plugins: tinymce_variables.plugins,
                      toolbar: tinymce_variables.toolbar
                    }}
                    onEditorChange={this.handleEditorChange}
                    value={this.state.body}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    className="form-btn"
                    fullWidth
                    // onClick={this.formSubmitHandler}
                    // disabled={loading}
                  >
                    Create Article
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default NewArticle;
