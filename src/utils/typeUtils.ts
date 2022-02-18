export type ExtractPromise<PROMISE> = PROMISE extends Promise<
  infer PROMISE_RESULT
>
  ? PROMISE_RESULT
  : PROMISE
