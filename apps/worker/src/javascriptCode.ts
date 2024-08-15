import moment from 'moment-timezone';
export const javascriptCode = async (code: string) => {
    try {
        // Create a new Function from the code string
        const compiledFunction = new Function('moment',code);
        
        // Capture console.log output
        const originalLog = console.log;
        let logs:any = [];
        console.log = (...args) => {
          logs.push(args.join(' '));
        };
  
        // Execute the compiled function
        const res = compiledFunction(moment);
  
        // Restore original console.log
        console.log = originalLog;

        return {result: res, log: logs.join('\n')};
      } catch (err:any) {
        return {log: err.toString()};
      }
}