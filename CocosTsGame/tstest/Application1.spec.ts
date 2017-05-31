 /// <reference path="../typings/globals/mocha/index.d.ts" />
  /// <reference path="../typings/modules/chai/index.d.ts" />

import { expect } from 'chai';
import Application1  from "../tssrc/Application1";

//var expect = chai.


describe('Application', () => {

    beforeEach(() => {
            console.log("before");
    });

    describe('Application1', () => {

        it('should be non null', () => {
            var app = new Application1();
            expect(app).to.not.be.null;
        });
    });
});