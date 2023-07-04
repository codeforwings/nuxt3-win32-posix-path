import {spawnSync} from "node:child_process";
import assert from "node:assert";

/**
 * factory function
 */
/**
 * @deprecated with function below
 * @param pathToExe
 * @param args
 * @param options
 * @return {(function(*, *): void)|*}
 * @example
 *   const assertW2Wb = createMochaCliExe(W2WB);1
 */
export function createMochaCliExe(pathToExe,args=[],options={}){
  //todo add better defaulting etc... didnt think i neeeded to modify the input
  const actualOptions = {shell:true,...options}

  return function(expectedValue,...inputToTest){
      const output = spawnSync(
        // `"${W2WB}" [C:\\` //cmd needs to double quote
        // `"${pathToExe}"`,[WSLPassTests[0][0]],actualOptions
        `"${pathToExe}"`,[...inputToTest],actualOptions
      );
      if(output.status !== 0){
        console.error(output);
        console.log(output.stdout.toString())
        console.error(output.stderr.toString())
        throw new Error("status not 0");
      }
      const actual = output.stdout.toString().trim();
      console.assert(actual === expectedValue,`inputToTest: ${inputToTest}`)
      assert.strictEqual(actual,expectedValue);
  }

}

/**
 * Revised Factory Creator. can replace  the top
 * can rename to somethuign like strictEqual
 */
export function createMochaCliExeNew(pathToExe,args=[],options={}){
  //todo add better defaulting etc... didnt think i neeeded to modify the input
  const actualOptions = {shell:true,...options}

  /**
   * @param inputToTest {string|string[]|object[]}
   * @param expectedValue {string|object}
   */
  return function(inputToTest,expectedValue){
      const argsInput = [...args];//fake copy
      if(Array.isArray(inputToTest)){
        argsInput.push(...inputToTest);
      }else{
        argsInput.push(inputToTest);
      }
      const output = spawnSync(
        `"${pathToExe}"`,argsInput,actualOptions
      );
      if(output.status !== 0){
        console.error(output);
        console.log(output.stdout.toString())
        console.error(output.stderr.toString())
        throw new Error("status not 0");
      }
      const actual = output.stdout.toString().trim();
      console.assert(actual === expectedValue,`inputToTest: ${inputToTest}`)
      assert.strictEqual(actual,expectedValue);
  }

}