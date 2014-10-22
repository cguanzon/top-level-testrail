'use strict';
var env = require('./env.js');
var request = require('request');
var express = require('express');
var app = express();

var testrailUrl = env.testrailUrl;

var getProjects = function(req, res){
    console.log('Getting from: ' + testrailUrl + '/get_projects');
    request.get(testrailUrl + '/get_projects',
        {
            headers: {
                'Content-Type': 'application/json'
            },
            auth: {
                user: env.user,
                pass: env.password
            }
        },
        function(error, response, body) {
            res.status(200).json(JSON.parse(body));
        }
    );
};

var getProjectsWithOpenMilestones = function(req, res) {
    request.get(testrailUrl + '/get_projects',
        {
            headers: {
                'Content-Type': 'application/json'
            },
            auth: {
                user: env.user,
                pass: env.password
            }
        },
        function(error, response, body) {
            var projects = JSON.parse(body);
            var projectArray = projects.map(function(project){
                return {
                        project_id: project.id,
                        project_name: project.name
                    };
            });
            console.log(projectIdArray)
            //implement Q here
            var promiseArray = projectArray.map(function(project){
                return request.get(testrailUrl + '/get_milestones/' + project.project_id + '&is_completed=0',
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        auth: {
                            user: env.user,
                            pass: env.password
                        }
                    },
                    function(error, response, body) {
                        projectArray.milestones = JSON.parse(body);
                    }
                );
            });




        }
    );
}
app.get('/projects', getProjectsWithOpenMilestones);



app.listen(5000);