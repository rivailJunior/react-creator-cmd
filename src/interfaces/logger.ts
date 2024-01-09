export default interface ILogger {
  success: (message: string, options?: any) => void;
  error: (message: string, options?: any) => void;
  warn: (message: string, options?: any) => void;
}
