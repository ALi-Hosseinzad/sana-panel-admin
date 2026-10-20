/**
 * تولید خودکار با Orval از روی OpenAPI — دستی ویرایش نشود (npm run api:generate)
 */
import {
  useMutation,
  useQuery
} from '@tanstack/react-query';
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  MutationFunction,
  QueryClient,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query';

import type {
  BasicInfoReasonsParams,
  CreateReasonCommand,
  ProblemDetails,
  ReadModelsBasicInfoDto,
  ReadModelsPlanDto,
  ReadModelsReasonDto,
  ReadModelsSchemeDto,
  UpdateBasicInfoCommand,
  UpdateReasonCommand
} from '../facilityPanelAPI.schemas';

import { apiClient } from '../../../../services/http/apiClient';
import type { ErrorType , BodyType } from '../../../../services/http/apiClient';


type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



const withQueryKey = <T extends object, K>(query: T, queryKey: K): T & { queryKey: K } => {
  const result = { queryKey } as T & { queryKey: K };
  for (const key of Object.keys(query)) {
    // The explicit queryKey always wins, matching the previous
    // `{ ...query, queryKey }` spread where it was set last.
    if (key === 'queryKey') continue;
    Object.defineProperty(result, key, {
      enumerable: true,
      configurable: true,
      get: () => (query as Record<string, unknown>)[key],
    });
  }
  return result;
};

/**
 * @summary طرح‌های کلان (نگین میثاق، شجره طیبه، ...)
 */
export const basicInfoSchemes = (

 options?: SecondParameter<typeof apiClient>,signal?: AbortSignal
) => {


      return apiClient<ReadModelsSchemeDto[] | null>(
      {url: `/BasicInfo/Schemes`, method: 'GET', signal
    },
      options);
    }




export const getBasicInfoSchemesQueryKey = () => {
    return [
    `/BasicInfo/Schemes`
    ] as const;
    }


export const getBasicInfoSchemesQueryOptions = <TData = Awaited<ReturnType<typeof basicInfoSchemes>>, TError = ErrorType<ProblemDetails>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof basicInfoSchemes>>, TError, TData>>, request?: SecondParameter<typeof apiClient>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getBasicInfoSchemesQueryKey();



    const queryFn: QueryFunction<Awaited<ReturnType<typeof basicInfoSchemes>>> = ({ signal }) => basicInfoSchemes(requestOptions, signal);





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof basicInfoSchemes>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type BasicInfoSchemesQueryResult = NonNullable<Awaited<ReturnType<typeof basicInfoSchemes>>>
export type BasicInfoSchemesQueryError = ErrorType<ProblemDetails>


export function useBasicInfoSchemes<TData = Awaited<ReturnType<typeof basicInfoSchemes>>, TError = ErrorType<ProblemDetails>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof basicInfoSchemes>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof basicInfoSchemes>>,
          TError,
          Awaited<ReturnType<typeof basicInfoSchemes>>
        > , 'initialData'
      >, request?: SecondParameter<typeof apiClient>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useBasicInfoSchemes<TData = Awaited<ReturnType<typeof basicInfoSchemes>>, TError = ErrorType<ProblemDetails>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof basicInfoSchemes>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof basicInfoSchemes>>,
          TError,
          Awaited<ReturnType<typeof basicInfoSchemes>>
        > , 'initialData'
      >, request?: SecondParameter<typeof apiClient>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useBasicInfoSchemes<TData = Awaited<ReturnType<typeof basicInfoSchemes>>, TError = ErrorType<ProblemDetails>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof basicInfoSchemes>>, TError, TData>>, request?: SecondParameter<typeof apiClient>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary طرح‌های کلان (نگین میثاق، شجره طیبه، ...)
 */

export function useBasicInfoSchemes<TData = Awaited<ReturnType<typeof basicInfoSchemes>>, TError = ErrorType<ProblemDetails>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof basicInfoSchemes>>, TError, TData>>, request?: SecondParameter<typeof apiClient>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getBasicInfoSchemesQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return withQueryKey(query, queryOptions.queryKey);
}






/**
 * @summary تنظیمات یک طرح (نرخ‌ها، مدت‌ها، ضرایب، جدول درصد قابل استفاده)
 */
export const basicInfoGet = (
    schemeId: number,
 options?: SecondParameter<typeof apiClient>,signal?: AbortSignal
) => {


      return apiClient<ReadModelsBasicInfoDto>(
      {url: `/BasicInfo/${schemeId}`, method: 'GET', signal
    },
      options);
    }




export const getBasicInfoGetQueryKey = (schemeId: number,) => {
    return [
    `/BasicInfo/${schemeId}`
    ] as const;
    }


export const getBasicInfoGetQueryOptions = <TData = Awaited<ReturnType<typeof basicInfoGet>>, TError = ErrorType<ProblemDetails>>(schemeId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof basicInfoGet>>, TError, TData>>, request?: SecondParameter<typeof apiClient>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getBasicInfoGetQueryKey(schemeId);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof basicInfoGet>>> = ({ signal }) => basicInfoGet(schemeId, requestOptions, signal);





   return  { queryKey, queryFn, enabled: schemeId !== null && schemeId !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof basicInfoGet>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type BasicInfoGetQueryResult = NonNullable<Awaited<ReturnType<typeof basicInfoGet>>>
export type BasicInfoGetQueryError = ErrorType<ProblemDetails>


export function useBasicInfoGet<TData = Awaited<ReturnType<typeof basicInfoGet>>, TError = ErrorType<ProblemDetails>>(
 schemeId: number, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof basicInfoGet>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof basicInfoGet>>,
          TError,
          Awaited<ReturnType<typeof basicInfoGet>>
        > , 'initialData'
      >, request?: SecondParameter<typeof apiClient>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useBasicInfoGet<TData = Awaited<ReturnType<typeof basicInfoGet>>, TError = ErrorType<ProblemDetails>>(
 schemeId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof basicInfoGet>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof basicInfoGet>>,
          TError,
          Awaited<ReturnType<typeof basicInfoGet>>
        > , 'initialData'
      >, request?: SecondParameter<typeof apiClient>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useBasicInfoGet<TData = Awaited<ReturnType<typeof basicInfoGet>>, TError = ErrorType<ProblemDetails>>(
 schemeId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof basicInfoGet>>, TError, TData>>, request?: SecondParameter<typeof apiClient>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary تنظیمات یک طرح (نرخ‌ها، مدت‌ها، ضرایب، جدول درصد قابل استفاده)
 */

export function useBasicInfoGet<TData = Awaited<ReturnType<typeof basicInfoGet>>, TError = ErrorType<ProblemDetails>>(
 schemeId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof basicInfoGet>>, TError, TData>>, request?: SecondParameter<typeof apiClient>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getBasicInfoGetQueryOptions(schemeId,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return withQueryKey(query, queryOptions.queryKey);
}






/**
 * فقط ادمین (پیش‌فرض). همهٔ محاسبات اعتبار از همین‌جا خوانده می‌شود.
 * @summary ذخیرهٔ تنظیمات پایه
 */
export const basicInfoUpdate = (
    schemeId: number,
    updateBasicInfoCommand?: BodyType<UpdateBasicInfoCommand>,
 options?: SecondParameter<typeof apiClient>,signal?: AbortSignal
) => {


      return apiClient<ReadModelsBasicInfoDto>(
      {url: `/BasicInfo/${schemeId}`, method: 'PUT',
      headers: {'Content-Type': 'application/json', },
      data: updateBasicInfoCommand, signal
    },
      options);
    }




export const getBasicInfoUpdateMutationKey = () => ['basicInfoUpdate'] as const;

export const getBasicInfoUpdateMutationOptions = <TError = ErrorType<ProblemDetails>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof basicInfoUpdate>>, TError,BasicInfoUpdateMutationVariables, TContext>, request?: SecondParameter<typeof apiClient>}
): UseMutationOptions<Awaited<ReturnType<typeof basicInfoUpdate>>, TError,BasicInfoUpdateMutationVariables, TContext> => {

const mutationKey = getBasicInfoUpdateMutationKey();
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof basicInfoUpdate>>, BasicInfoUpdateMutationVariables> = (props) => {
          const {schemeId,data} = props ?? {};

          return  basicInfoUpdate(schemeId,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type BasicInfoUpdateMutationResult = NonNullable<Awaited<ReturnType<typeof basicInfoUpdate>>>
    export type BasicInfoUpdateMutationBody = BodyType<UpdateBasicInfoCommand> | undefined
    export type BasicInfoUpdateMutationError = ErrorType<ProblemDetails>
    export type BasicInfoUpdateMutationVariables = {schemeId: number;data?: BodyType<UpdateBasicInfoCommand>}

    /**
 * @summary ذخیرهٔ تنظیمات پایه
 */
export const useBasicInfoUpdate = <TError = ErrorType<ProblemDetails>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof basicInfoUpdate>>, TError,BasicInfoUpdateMutationVariables, TContext>, request?: SecondParameter<typeof apiClient>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof basicInfoUpdate>>,
        TError,
        BasicInfoUpdateMutationVariables,
        TContext
      > => {
      return useMutation(getBasicInfoUpdateMutationOptions(options), queryClient);
    }
    /**
 * برای فرم ثبت شرکت و انتخاب طرح در تخصیص وام.
 * @summary طرح‌های قابل انتخاب (عقد × نرخ × مدت)
 */
export const basicInfoPlans = (
    schemeId: number,
 options?: SecondParameter<typeof apiClient>,signal?: AbortSignal
) => {


      return apiClient<ReadModelsPlanDto[] | null>(
      {url: `/BasicInfo/${schemeId}/Plans`, method: 'GET', signal
    },
      options);
    }




export const getBasicInfoPlansQueryKey = (schemeId: number,) => {
    return [
    `/BasicInfo/${schemeId}/Plans`
    ] as const;
    }


export const getBasicInfoPlansQueryOptions = <TData = Awaited<ReturnType<typeof basicInfoPlans>>, TError = ErrorType<ProblemDetails>>(schemeId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof basicInfoPlans>>, TError, TData>>, request?: SecondParameter<typeof apiClient>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getBasicInfoPlansQueryKey(schemeId);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof basicInfoPlans>>> = ({ signal }) => basicInfoPlans(schemeId, requestOptions, signal);





   return  { queryKey, queryFn, enabled: schemeId !== null && schemeId !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof basicInfoPlans>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type BasicInfoPlansQueryResult = NonNullable<Awaited<ReturnType<typeof basicInfoPlans>>>
export type BasicInfoPlansQueryError = ErrorType<ProblemDetails>


export function useBasicInfoPlans<TData = Awaited<ReturnType<typeof basicInfoPlans>>, TError = ErrorType<ProblemDetails>>(
 schemeId: number, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof basicInfoPlans>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof basicInfoPlans>>,
          TError,
          Awaited<ReturnType<typeof basicInfoPlans>>
        > , 'initialData'
      >, request?: SecondParameter<typeof apiClient>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useBasicInfoPlans<TData = Awaited<ReturnType<typeof basicInfoPlans>>, TError = ErrorType<ProblemDetails>>(
 schemeId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof basicInfoPlans>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof basicInfoPlans>>,
          TError,
          Awaited<ReturnType<typeof basicInfoPlans>>
        > , 'initialData'
      >, request?: SecondParameter<typeof apiClient>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useBasicInfoPlans<TData = Awaited<ReturnType<typeof basicInfoPlans>>, TError = ErrorType<ProblemDetails>>(
 schemeId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof basicInfoPlans>>, TError, TData>>, request?: SecondParameter<typeof apiClient>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary طرح‌های قابل انتخاب (عقد × نرخ × مدت)
 */

export function useBasicInfoPlans<TData = Awaited<ReturnType<typeof basicInfoPlans>>, TError = ErrorType<ProblemDetails>>(
 schemeId: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof basicInfoPlans>>, TError, TData>>, request?: SecondParameter<typeof apiClient>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getBasicInfoPlansQueryOptions(schemeId,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return withQueryKey(query, queryOptions.queryKey);
}






/**
 * دلایل لغو قرارداد، رد وام، عدم اعطای غیرحضوری، لغو درخواست، رد پرسنل، نوع مستند. برای Dropdown مدال‌ها.
 * @summary فهرست‌های داینامیک
 */
export const basicInfoReasons = (
    params?: BasicInfoReasonsParams,
 options?: SecondParameter<typeof apiClient>,signal?: AbortSignal
) => {


      return apiClient<ReadModelsReasonDto[] | null>(
      {url: `/BasicInfo/Reasons`, method: 'GET',
        params, signal
    },
      options);
    }




export const getBasicInfoReasonsQueryKey = (params?: BasicInfoReasonsParams,) => {
    return [
    `/BasicInfo/Reasons`, ...(params ? [params] : [])
    ] as const;
    }


export const getBasicInfoReasonsQueryOptions = <TData = Awaited<ReturnType<typeof basicInfoReasons>>, TError = ErrorType<ProblemDetails>>(params?: BasicInfoReasonsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof basicInfoReasons>>, TError, TData>>, request?: SecondParameter<typeof apiClient>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getBasicInfoReasonsQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof basicInfoReasons>>> = ({ signal }) => basicInfoReasons(params, requestOptions, signal);





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof basicInfoReasons>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type BasicInfoReasonsQueryResult = NonNullable<Awaited<ReturnType<typeof basicInfoReasons>>>
export type BasicInfoReasonsQueryError = ErrorType<ProblemDetails>


export function useBasicInfoReasons<TData = Awaited<ReturnType<typeof basicInfoReasons>>, TError = ErrorType<ProblemDetails>>(
 params: undefined |  BasicInfoReasonsParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof basicInfoReasons>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof basicInfoReasons>>,
          TError,
          Awaited<ReturnType<typeof basicInfoReasons>>
        > , 'initialData'
      >, request?: SecondParameter<typeof apiClient>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useBasicInfoReasons<TData = Awaited<ReturnType<typeof basicInfoReasons>>, TError = ErrorType<ProblemDetails>>(
 params?: BasicInfoReasonsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof basicInfoReasons>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof basicInfoReasons>>,
          TError,
          Awaited<ReturnType<typeof basicInfoReasons>>
        > , 'initialData'
      >, request?: SecondParameter<typeof apiClient>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useBasicInfoReasons<TData = Awaited<ReturnType<typeof basicInfoReasons>>, TError = ErrorType<ProblemDetails>>(
 params?: BasicInfoReasonsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof basicInfoReasons>>, TError, TData>>, request?: SecondParameter<typeof apiClient>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary فهرست‌های داینامیک
 */

export function useBasicInfoReasons<TData = Awaited<ReturnType<typeof basicInfoReasons>>, TError = ErrorType<ProblemDetails>>(
 params?: BasicInfoReasonsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof basicInfoReasons>>, TError, TData>>, request?: SecondParameter<typeof apiClient>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getBasicInfoReasonsQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return withQueryKey(query, queryOptions.queryKey);
}






/**
 * @summary افزودن دلیل جدید
 */
export const basicInfoReasonCreate = (
    createReasonCommand?: BodyType<CreateReasonCommand>,
 options?: SecondParameter<typeof apiClient>,signal?: AbortSignal
) => {


      return apiClient<ReadModelsReasonDto>(
      {url: `/BasicInfo/Reasons`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: createReasonCommand, signal
    },
      options);
    }




export const getBasicInfoReasonCreateMutationKey = () => ['basicInfoReasonCreate'] as const;

export const getBasicInfoReasonCreateMutationOptions = <TError = ErrorType<ProblemDetails>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof basicInfoReasonCreate>>, TError,BasicInfoReasonCreateMutationVariables, TContext>, request?: SecondParameter<typeof apiClient>}
): UseMutationOptions<Awaited<ReturnType<typeof basicInfoReasonCreate>>, TError,BasicInfoReasonCreateMutationVariables, TContext> => {

const mutationKey = getBasicInfoReasonCreateMutationKey();
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof basicInfoReasonCreate>>, BasicInfoReasonCreateMutationVariables> = (props) => {
          const {data} = props ?? {};

          return  basicInfoReasonCreate(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type BasicInfoReasonCreateMutationResult = NonNullable<Awaited<ReturnType<typeof basicInfoReasonCreate>>>
    export type BasicInfoReasonCreateMutationBody = BodyType<CreateReasonCommand> | undefined
    export type BasicInfoReasonCreateMutationError = ErrorType<ProblemDetails>
    export type BasicInfoReasonCreateMutationVariables = {data?: BodyType<CreateReasonCommand>}

    /**
 * @summary افزودن دلیل جدید
 */
export const useBasicInfoReasonCreate = <TError = ErrorType<ProblemDetails>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof basicInfoReasonCreate>>, TError,BasicInfoReasonCreateMutationVariables, TContext>, request?: SecondParameter<typeof apiClient>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof basicInfoReasonCreate>>,
        TError,
        BasicInfoReasonCreateMutationVariables,
        TContext
      > => {
      return useMutation(getBasicInfoReasonCreateMutationOptions(options), queryClient);
    }
    /**
 * @summary ویرایش/غیرفعال کردن دلیل
 */
export const basicInfoReasonUpdate = (
    id: number,
    updateReasonCommand?: BodyType<UpdateReasonCommand>,
 options?: SecondParameter<typeof apiClient>,signal?: AbortSignal
) => {


      return apiClient<ReadModelsReasonDto>(
      {url: `/BasicInfo/Reasons/${id}`, method: 'PUT',
      headers: {'Content-Type': 'application/json', },
      data: updateReasonCommand, signal
    },
      options);
    }




export const getBasicInfoReasonUpdateMutationKey = () => ['basicInfoReasonUpdate'] as const;

export const getBasicInfoReasonUpdateMutationOptions = <TError = ErrorType<ProblemDetails>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof basicInfoReasonUpdate>>, TError,BasicInfoReasonUpdateMutationVariables, TContext>, request?: SecondParameter<typeof apiClient>}
): UseMutationOptions<Awaited<ReturnType<typeof basicInfoReasonUpdate>>, TError,BasicInfoReasonUpdateMutationVariables, TContext> => {

const mutationKey = getBasicInfoReasonUpdateMutationKey();
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof basicInfoReasonUpdate>>, BasicInfoReasonUpdateMutationVariables> = (props) => {
          const {id,data} = props ?? {};

          return  basicInfoReasonUpdate(id,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type BasicInfoReasonUpdateMutationResult = NonNullable<Awaited<ReturnType<typeof basicInfoReasonUpdate>>>
    export type BasicInfoReasonUpdateMutationBody = BodyType<UpdateReasonCommand> | undefined
    export type BasicInfoReasonUpdateMutationError = ErrorType<ProblemDetails>
    export type BasicInfoReasonUpdateMutationVariables = {id: number;data?: BodyType<UpdateReasonCommand>}

    /**
 * @summary ویرایش/غیرفعال کردن دلیل
 */
export const useBasicInfoReasonUpdate = <TError = ErrorType<ProblemDetails>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof basicInfoReasonUpdate>>, TError,BasicInfoReasonUpdateMutationVariables, TContext>, request?: SecondParameter<typeof apiClient>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof basicInfoReasonUpdate>>,
        TError,
        BasicInfoReasonUpdateMutationVariables,
        TContext
      > => {
      return useMutation(getBasicInfoReasonUpdateMutationOptions(options), queryClient);
    }
    /**
 * @summary حذف دلیل (نرم)
 */
export const basicInfoReasonDelete = (
    id: number,
 options?: SecondParameter<typeof apiClient>,signal?: AbortSignal
) => {


      return apiClient<boolean>(
      {url: `/BasicInfo/Reasons/${id}`, method: 'DELETE', signal
    },
      options);
    }




export const getBasicInfoReasonDeleteMutationKey = () => ['basicInfoReasonDelete'] as const;

export const getBasicInfoReasonDeleteMutationOptions = <TError = ErrorType<ProblemDetails>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof basicInfoReasonDelete>>, TError,BasicInfoReasonDeleteMutationVariables, TContext>, request?: SecondParameter<typeof apiClient>}
): UseMutationOptions<Awaited<ReturnType<typeof basicInfoReasonDelete>>, TError,BasicInfoReasonDeleteMutationVariables, TContext> => {

const mutationKey = getBasicInfoReasonDeleteMutationKey();
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof basicInfoReasonDelete>>, BasicInfoReasonDeleteMutationVariables> = (props) => {
          const {id} = props ?? {};

          return  basicInfoReasonDelete(id,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type BasicInfoReasonDeleteMutationResult = NonNullable<Awaited<ReturnType<typeof basicInfoReasonDelete>>>

    export type BasicInfoReasonDeleteMutationError = ErrorType<ProblemDetails>
    export type BasicInfoReasonDeleteMutationVariables = {id: number}

    /**
 * @summary حذف دلیل (نرم)
 */
export const useBasicInfoReasonDelete = <TError = ErrorType<ProblemDetails>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof basicInfoReasonDelete>>, TError,BasicInfoReasonDeleteMutationVariables, TContext>, request?: SecondParameter<typeof apiClient>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof basicInfoReasonDelete>>,
        TError,
        BasicInfoReasonDeleteMutationVariables,
        TContext
      > => {
      return useMutation(getBasicInfoReasonDeleteMutationOptions(options), queryClient);
    }
