import { ApiErrorResponse, ApiSuccessResponse, isApiResponseError } from '../api/response';
import { useState } from 'react';

export interface State<T> {
  data?: T;
  error?: Error | ApiErrorResponse;
  loading: boolean;
  request: Function;
  notfound: boolean
  clear: () => void
  // onDone: Dispatch<SetStateAction<(param: T)=>void>>
  // onError: Dispatch<SetStateAction<(err: any)=>void>>
}

export function useFetch<T = unknown>(fn: Function, onDone?: (param: T)=>void, onError?: (err: any)=>void  ): State<T> {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error | ApiErrorResponse>();
  const [loading, setLoading] = useState<boolean>(false);
  const [notfound, setNotFound] = useState<boolean>(false);
  // const [onDone, setOnDone] = useState<(param: T)=>void>(_onDone ? _onDone : () => {} );
  // const [onError, setOnError] = useState<(param: any)=>void>(_onError ? _onError : () => {} );

  const request = async (...args: any[]) => {
    // Reset the value before request
    setData(undefined);
    setError(undefined);
    setLoading(true);


    try {
      const response: ApiSuccessResponse<T> = await fn(...args);
      const data: T = response.data as T;

      setData(data);
      if(onDone !== undefined){
        onDone(data)
      }
    } catch (error) {
      if(isApiResponseError(error)){
        if(error.http_status === 404){
          setNotFound(true)
        }
        setError(error as ApiErrorResponse);
      } else {
        setError(error as Error)
      }
      
      if(onError !== undefined){
        onError(error)
      }
      // toast.error((error as ApiErrorResponse).message);
    } finally {
      setLoading(false);
    }
  };

  return {
    data: data,
    error: error,
    loading: loading,
    request: request,
    notfound: notfound,
    clear: () => setData(undefined)
  };
}
