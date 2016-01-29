const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const mongoose = require('mongoose');
const server = require(__dirname + '/../server');//eslint-disable-line
const request = chai.request;
const origin = 'localhost:3000';

describe('Test auth routes', () => {});
