 /// <reference path="../typings/globals/mocha/index.d.ts" />
  /// <reference path="../tssrc/greet.ts" />

import sayHello = typescriptbase.sayHello;

describe('SayHello', () => {

    beforeEach(() => {

    });

    describe('sayHello', () => {

        it('should return concatinated string', () => {
            console.log(sayHello("TypeScript"));
        });
    });
});