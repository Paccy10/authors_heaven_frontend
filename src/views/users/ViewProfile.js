/* eslint-disable react/jsx-wrap-multilines */
import React, { Component } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Button,
  AppBar,
  Tabs,
  Tab,
  Paper
} from '@material-ui/core';
import TabPanel from '../../components/UI/TabPanel';

class ViewProfile extends Component {
  state = {
    tabValue: 0
  };

  handleTabChange = (event, newValue) => {
    this.setState({ tabValue: newValue });
  };

  a11yProps = index => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    };
  };

  render() {
    return (
      <div className="container">
        <Grid container justify="center">
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={3}>
                    <p>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Eligendi, aspernatur similique voluptate quod facere
                      reprehenderit ex, quibusdam dicta odit, eos ut repudiandae
                      vero mollitia ullam numquam animi tempora amet cumque.
                    </p>
                  </Grid>
                  <Grid item xs={9}>
                    <AppBar position="static" color="default">
                      <Tabs
                        value={this.state.tabValue}
                        textColor="secondary"
                        onChange={this.handleTabChange}
                      >
                        <Tab
                          label={
                            <div className="tabLabelContainer">
                              <span>Articles</span>
                              <span>0</span>
                            </div>
                          }
                          {...this.a11yProps(0)}
                        />
                        <Tab
                          label={
                            <div className="tabLabelContainer">
                              <span>Followers</span>
                              <span>0</span>
                            </div>
                          }
                          {...this.a11yProps(1)}
                        />
                        <Tab
                          label={
                            <div className="tabLabelContainer">
                              <span>Following</span>
                              <span>0</span>
                            </div>
                          }
                          {...this.a11yProps(2)}
                        />
                      </Tabs>
                    </AppBar>
                    <Paper>
                      <TabPanel value={this.state.tabValue} index={0}>
                        Item One
                      </TabPanel>
                      <TabPanel value={this.state.tabValue} index={1}>
                        Item Two
                      </TabPanel>
                      <TabPanel value={this.state.tabValue} index={2}>
                        Item Three
                      </TabPanel>
                    </Paper>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ViewProfile;
