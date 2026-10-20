/**
 * تولید خودکار با Orval از روی OpenAPI — دستی ویرایش نشود (npm run api:generate)
 */
import {
  faker
} from '@faker-js/faker/locale/fa';

import {
  delay,
  http
} from 'msw';
import type {
  RequestHandlerOptions
} from 'msw';
import { json } from '@/test/msw/utils';

import type {
  ReadModelsBasicInfoDto,
  ReadModelsPlanDto,
  ReadModelsReasonDto,
  ReadModelsSchemeDto
} from '../facilityPanelAPI.schemas';


export const getBasicInfoSchemesResponseMock = (): ReadModelsSchemeDto[] | null => (Array.from({ length: faker.number.int({min: 1, max: 10}) }, (_, i) => i + 1).map(() => ({id: faker.number.int(), code: faker.string.alpha({length: {min: 10, max: 20}}), title: faker.string.alpha({length: {min: 10, max: 20}}), isActive: faker.datatype.boolean()})))

export const getBasicInfoGetResponseMock = (overrideResponse: Partial<Extract<ReadModelsBasicInfoDto, object>> = {}): ReadModelsBasicInfoDto => ({schemeId: faker.number.int(), contractTypes: faker.helpers.arrayElements([1,2] as const), qardHasanRate: faker.number.float({fractionDigits: 2}), murabahaRates: Array.from({ length: faker.number.int({min: 1, max: 10}) }, (_, i) => i + 1).map(() => (faker.number.float({fractionDigits: 2}))), repaymentTermsMonths: Array.from({ length: faker.number.int({min: 1, max: 10}) }, (_, i) => i + 1).map(() => (faker.number.int())), salaryFromSepahMultiplierYes: faker.number.float({fractionDigits: 2}), salaryFromSepahMultiplierNo: faker.number.float({fractionDigits: 2}), contractDurationMonths: faker.number.int(), graceMonthsAfterExpiry: faker.number.int(), maxPlansPerCompany: faker.number.int(), personnelIntroductionDelayMonths: faker.number.int(), waitingPeriodDays: faker.number.int(), usableTable: Array.from({ length: faker.number.int({min: 1, max: 10}) }, (_, i) => i + 1).map(() => ({termMonths: faker.number.int(), contractType: faker.helpers.arrayElement([1,2] as const), rate: faker.number.float({fractionDigits: 2}), usablePercent: faker.number.float({fractionDigits: 2})})), rowVersion: faker.string.alpha({length: {min: 10, max: 20}}), digitalApprovalEnabled: faker.datatype.boolean(), ...overrideResponse})

export const getBasicInfoUpdateResponseMock = (overrideResponse: Partial<Extract<ReadModelsBasicInfoDto, object>> = {}): ReadModelsBasicInfoDto => ({schemeId: faker.number.int(), contractTypes: faker.helpers.arrayElements([1,2] as const), qardHasanRate: faker.number.float({fractionDigits: 2}), murabahaRates: Array.from({ length: faker.number.int({min: 1, max: 10}) }, (_, i) => i + 1).map(() => (faker.number.float({fractionDigits: 2}))), repaymentTermsMonths: Array.from({ length: faker.number.int({min: 1, max: 10}) }, (_, i) => i + 1).map(() => (faker.number.int())), salaryFromSepahMultiplierYes: faker.number.float({fractionDigits: 2}), salaryFromSepahMultiplierNo: faker.number.float({fractionDigits: 2}), contractDurationMonths: faker.number.int(), graceMonthsAfterExpiry: faker.number.int(), maxPlansPerCompany: faker.number.int(), personnelIntroductionDelayMonths: faker.number.int(), waitingPeriodDays: faker.number.int(), usableTable: Array.from({ length: faker.number.int({min: 1, max: 10}) }, (_, i) => i + 1).map(() => ({termMonths: faker.number.int(), contractType: faker.helpers.arrayElement([1,2] as const), rate: faker.number.float({fractionDigits: 2}), usablePercent: faker.number.float({fractionDigits: 2})})), rowVersion: faker.string.alpha({length: {min: 10, max: 20}}), digitalApprovalEnabled: faker.datatype.boolean(), ...overrideResponse})

export const getBasicInfoPlansResponseMock = (): ReadModelsPlanDto[] | null => (Array.from({ length: faker.number.int({min: 1, max: 10}) }, (_, i) => i + 1).map(() => ({id: faker.number.int(), contractType: faker.helpers.arrayElement([1,2] as const), rate: faker.number.float({fractionDigits: 2}), termMonths: faker.number.int(), usablePercent: faker.number.float({fractionDigits: 2}), title: faker.string.alpha({length: {min: 10, max: 20}})})))

export const getBasicInfoReasonsResponseMock = (): ReadModelsReasonDto[] | null => (Array.from({ length: faker.number.int({min: 1, max: 10}) }, (_, i) => i + 1).map(() => ({id: faker.number.int(), type: faker.helpers.arrayElement([1,2,3,4,5,6] as const), title: faker.string.alpha({length: {min: 10, max: 20}}), isActive: faker.datatype.boolean(), sortOrder: faker.number.int()})))

export const getBasicInfoReasonCreateResponseMock = (overrideResponse: Partial<Extract<ReadModelsReasonDto, object>> = {}): ReadModelsReasonDto => ({id: faker.number.int(), type: faker.helpers.arrayElement([1,2,3,4,5,6] as const), title: faker.string.alpha({length: {min: 10, max: 20}}), isActive: faker.datatype.boolean(), sortOrder: faker.number.int(), ...overrideResponse})

export const getBasicInfoReasonUpdateResponseMock = (overrideResponse: Partial<Extract<ReadModelsReasonDto, object>> = {}): ReadModelsReasonDto => ({id: faker.number.int(), type: faker.helpers.arrayElement([1,2,3,4,5,6] as const), title: faker.string.alpha({length: {min: 10, max: 20}}), isActive: faker.datatype.boolean(), sortOrder: faker.number.int(), ...overrideResponse})

export const getBasicInfoReasonDeleteResponseMock = (): boolean => (faker.datatype.boolean())


export const getBasicInfoSchemesMockHandler = (overrideResponse?: ReadModelsSchemeDto[] | null | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<ReadModelsSchemeDto[] | null> | ReadModelsSchemeDto[] | null), options?: RequestHandlerOptions) => {
  return http.get('*/BasicInfo/Schemes', async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {await delay(250);


    return json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getBasicInfoSchemesResponseMock(),
      { status: 200
      })
  }, options)
}

export const getBasicInfoGetMockHandler = (overrideResponse?: ReadModelsBasicInfoDto | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<ReadModelsBasicInfoDto> | ReadModelsBasicInfoDto), options?: RequestHandlerOptions) => {
  return http.get('*/BasicInfo/:schemeId', async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {await delay(250);


    return json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getBasicInfoGetResponseMock(),
      { status: 200
      })
  }, options)
}

export const getBasicInfoUpdateMockHandler = (overrideResponse?: ReadModelsBasicInfoDto | ((info: Parameters<Parameters<typeof http.put>[1]>[0]) => Promise<ReadModelsBasicInfoDto> | ReadModelsBasicInfoDto), options?: RequestHandlerOptions) => {
  return http.put('*/BasicInfo/:schemeId', async (info: Parameters<Parameters<typeof http.put>[1]>[0]) => {await delay(250);


    return json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getBasicInfoUpdateResponseMock(),
      { status: 200
      })
  }, options)
}

export const getBasicInfoPlansMockHandler = (overrideResponse?: ReadModelsPlanDto[] | null | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<ReadModelsPlanDto[] | null> | ReadModelsPlanDto[] | null), options?: RequestHandlerOptions) => {
  return http.get('*/BasicInfo/:schemeId/Plans', async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {await delay(250);


    return json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getBasicInfoPlansResponseMock(),
      { status: 200
      })
  }, options)
}

export const getBasicInfoReasonsMockHandler = (overrideResponse?: ReadModelsReasonDto[] | null | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<ReadModelsReasonDto[] | null> | ReadModelsReasonDto[] | null), options?: RequestHandlerOptions) => {
  return http.get('*/BasicInfo/Reasons', async (info: Parameters<Parameters<typeof http.get>[1]>[0]) => {await delay(250);


    return json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getBasicInfoReasonsResponseMock(),
      { status: 200
      })
  }, options)
}

export const getBasicInfoReasonCreateMockHandler = (overrideResponse?: ReadModelsReasonDto | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<ReadModelsReasonDto> | ReadModelsReasonDto), options?: RequestHandlerOptions) => {
  return http.post('*/BasicInfo/Reasons', async (info: Parameters<Parameters<typeof http.post>[1]>[0]) => {await delay(250);


    return json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getBasicInfoReasonCreateResponseMock(),
      { status: 200
      })
  }, options)
}

export const getBasicInfoReasonUpdateMockHandler = (overrideResponse?: ReadModelsReasonDto | ((info: Parameters<Parameters<typeof http.put>[1]>[0]) => Promise<ReadModelsReasonDto> | ReadModelsReasonDto), options?: RequestHandlerOptions) => {
  return http.put('*/BasicInfo/Reasons/:id', async (info: Parameters<Parameters<typeof http.put>[1]>[0]) => {await delay(250);


    return json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getBasicInfoReasonUpdateResponseMock(),
      { status: 200
      })
  }, options)
}

export const getBasicInfoReasonDeleteMockHandler = (overrideResponse?: boolean | ((info: Parameters<Parameters<typeof http.delete>[1]>[0]) => Promise<boolean> | boolean), options?: RequestHandlerOptions) => {
  return http.delete('*/BasicInfo/Reasons/:id', async (info: Parameters<Parameters<typeof http.delete>[1]>[0]) => {await delay(250);


    return json(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getBasicInfoReasonDeleteResponseMock(),
      { status: 200
      })
  }, options)
}
export const getBasicInfoMock = () => [
  getBasicInfoSchemesMockHandler(),
  getBasicInfoGetMockHandler(),
  getBasicInfoUpdateMockHandler(),
  getBasicInfoPlansMockHandler(),
  getBasicInfoReasonsMockHandler(),
  getBasicInfoReasonCreateMockHandler(),
  getBasicInfoReasonUpdateMockHandler(),
  getBasicInfoReasonDeleteMockHandler()
]
