export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: { input: any; output: any; }
  /** The `Long` scalar type represents non-fractional signed whole 64-bit numeric values. Long can represent values between -(2^63) and 2^63 - 1. */
  Long: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

export type Address = {
  __typename?: 'Address';
  /** Optional: The city where the site is located. */
  city?: Maybe<Scalars['String']['output']>;
  /** Optional: The country code of where the site is located. For example SE or DE. */
  countryCode?: Maybe<Scalars['String']['output']>;
  /** Optional: The postal code of the site. */
  postalCode?: Maybe<Scalars['String']['output']>;
  /** Optional: The street address of the site. */
  street?: Maybe<Scalars['String']['output']>;
};

export type AddressFilterInput = {
  and?: InputMaybe<Array<AddressFilterInput>>;
  /** Optional: The city where the site is located. */
  city?: InputMaybe<StringOperationFilterInput>;
  /** Optional: The country code of where the site is located. For example SE or DE. */
  countryCode?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<AddressFilterInput>>;
  /** Optional: The postal code of the site. */
  postalCode?: InputMaybe<StringOperationFilterInput>;
  /** Optional: The street address of the site. */
  street?: InputMaybe<StringOperationFilterInput>;
};

export type AddressSortInput = {
  /** Optional: The city where the site is located. */
  city?: InputMaybe<SortEnumType>;
  /** Optional: The country code of where the site is located. For example SE or DE. */
  countryCode?: InputMaybe<SortEnumType>;
  /** Optional: The postal code of the site. */
  postalCode?: InputMaybe<SortEnumType>;
  /** Optional: The street address of the site. */
  street?: InputMaybe<SortEnumType>;
};

/** Defines when a policy shall be executed. */
export enum ApplyPolicy {
  /** After the resolver was executed. */
  AfterResolver = 'AFTER_RESOLVER',
  /** Before the resolver was executed. */
  BeforeResolver = 'BEFORE_RESOLVER',
  /** The policy is applied in the validation step before the execution. */
  Validation = 'VALIDATION'
}

export type AssetNotFoundError = Error & {
  __typename?: 'AssetNotFoundError';
  message: Scalars['String']['output'];
};

export type BooleanOperationFilterInput = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  neq?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Represents a machine brand. */
export type Brand = {
  __typename?: 'Brand';
  /** Required: The unique code for the brand. */
  code: Scalars['String']['output'];
  /** Required: The name of the brand. */
  name: Scalars['String']['output'];
};

/** Represents a machine brand. */
export type BrandFilterInput = {
  and?: InputMaybe<Array<BrandFilterInput>>;
  /** Required: The unique code for the brand. */
  code?: InputMaybe<StringOperationFilterInput>;
  /** Required: The name of the brand. */
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<BrandFilterInput>>;
};

/** Represents a machine brand. */
export type BrandSortInput = {
  /** Required: The unique code for the brand. */
  code?: InputMaybe<SortEnumType>;
  /** Required: The name of the brand. */
  name?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type BrandsConnection = {
  __typename?: 'BrandsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<BrandsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Brand>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type BrandsEdge = {
  __typename?: 'BrandsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Brand;
};

/** A connection to a list of items. */
export type ChildDepartmentsConnection = {
  __typename?: 'ChildDepartmentsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ChildDepartmentsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Department>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ChildDepartmentsEdge = {
  __typename?: 'ChildDepartmentsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Department;
};

export enum ContractPlanType {
  Basic = 'BASIC',
  Explorer = 'EXPLORER'
}

export type ContractPlanTypeOperationFilterInput = {
  eq?: InputMaybe<ContractPlanType>;
  in?: InputMaybe<Array<ContractPlanType>>;
  neq?: InputMaybe<ContractPlanType>;
  nin?: InputMaybe<Array<ContractPlanType>>;
};

export type CreateCustomerError = NotAllowedError | ValidationError;

export type CreateCustomerInput = {
  customer: CustomerCreateInput;
};

export type CreateCustomerPayload = {
  __typename?: 'CreateCustomerPayload';
  customer?: Maybe<Customer>;
  errors?: Maybe<Array<CreateCustomerError>>;
};

export type CreateCustomersError = NotAllowedError | ValidationError;

export type CreateCustomersInput = {
  customers: Array<CustomerCreateInput>;
};

export type CreateCustomersPayload = {
  __typename?: 'CreateCustomersPayload';
  customers?: Maybe<Array<Customer>>;
  errors?: Maybe<Array<CreateCustomersError>>;
};

export type CreateDepartmentError = NotAllowedError | ValidationError;

export type CreateDepartmentInput = {
  department: DepartmentCreateInput;
};

export type CreateDepartmentPayload = {
  __typename?: 'CreateDepartmentPayload';
  department?: Maybe<Department>;
  errors?: Maybe<Array<CreateDepartmentError>>;
};

export type CreateDepartmentsError = NotAllowedError | ValidationError;

export type CreateDepartmentsInput = {
  departments: Array<DepartmentCreateInput>;
};

export type CreateDepartmentsPayload = {
  __typename?: 'CreateDepartmentsPayload';
  departments?: Maybe<Array<Department>>;
  errors?: Maybe<Array<CreateDepartmentsError>>;
};

export type CreateMachineError = AssetNotFoundError | NotAllowedError;

export type CreateMachineInput = {
  machineCreate: MachineCreateInput;
};

export type CreateMachinePayload = {
  __typename?: 'CreateMachinePayload';
  errors?: Maybe<Array<CreateMachineError>>;
  machine?: Maybe<Machine>;
};

export type CreateMachinesError = AssetNotFoundError | NotAllowedError;

export type CreateMachinesInput = {
  machines: Array<MachineCreateInput>;
};

export type CreateMachinesPayload = {
  __typename?: 'CreateMachinesPayload';
  errors?: Maybe<Array<CreateMachinesError>>;
  machines?: Maybe<Array<Machine>>;
};

export type CreateSiteError = NotAllowedError | ValidationError;

export type CreateSiteInput = {
  site: SiteCreateInput;
};

export type CreateSitePayload = {
  __typename?: 'CreateSitePayload';
  errors?: Maybe<Array<CreateSiteError>>;
  site?: Maybe<Site>;
};

export type CreateSitesError = NotAllowedError | ValidationError;

export type CreateSitesInput = {
  sites: Array<SiteCreateInput>;
};

export type CreateSitesPayload = {
  __typename?: 'CreateSitesPayload';
  errors?: Maybe<Array<CreateSitesError>>;
  sites?: Maybe<Array<Site>>;
};

/** Represents a customer entity that may have one or more connected warehouse sites, with attributes such as unique identifiers, department association, and optional ERP system identifiers. */
export type Customer = {
  __typename?: 'Customer';
  department?: Maybe<Department>;
  /** Required: A unique identifier for the department. */
  departmentId: Scalars['UUID']['output'];
  /** Optional: A unique identifier of the customer in the ERP system. */
  erpId?: Maybe<Scalars['String']['output']>;
  /** The unique identifier of the customer. */
  id: Scalars['UUID']['output'];
  /** Required: The name of the customer. */
  name: Scalars['String']['output'];
  sites?: Maybe<SitesConnection>;
};


/** Represents a customer entity that may have one or more connected warehouse sites, with attributes such as unique identifiers, department association, and optional ERP system identifiers. */
export type CustomerDepartmentArgs = {
  where?: InputMaybe<DepartmentFilterInput>;
};


/** Represents a customer entity that may have one or more connected warehouse sites, with attributes such as unique identifiers, department association, and optional ERP system identifiers. */
export type CustomerSitesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SiteFilterInput>;
};

export type CustomerCreateInput = {
  departmentId: Scalars['UUID']['input'];
  erpId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

/** Represents a customer entity that may have one or more connected warehouse sites, with attributes such as unique identifiers, department association, and optional ERP system identifiers. */
export type CustomerFilterInput = {
  and?: InputMaybe<Array<CustomerFilterInput>>;
  /** Required: A unique identifier for the department. */
  departmentId?: InputMaybe<UuidOperationFilterInput>;
  /** Optional: A unique identifier of the {className} in the ERP system. */
  erpId?: InputMaybe<StringOperationFilterInput>;
  /** The unique identifier of the {className}. */
  id?: InputMaybe<UuidOperationFilterInput>;
  /** Required: The name of the customer. */
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<CustomerFilterInput>>;
};

/** Represents a customer entity that may have one or more connected warehouse sites, with attributes such as unique identifiers, department association, and optional ERP system identifiers. */
export type CustomerSortInput = {
  /** Required: A unique identifier for the department. */
  departmentId?: InputMaybe<SortEnumType>;
  /** Optional: A unique identifier of the {className} in the ERP system. */
  erpId?: InputMaybe<SortEnumType>;
  /** The unique identifier of the {className}. */
  id?: InputMaybe<SortEnumType>;
  /** Required: The name of the customer. */
  name?: InputMaybe<SortEnumType>;
};

export type CustomerUpdateInput = {
  erpId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of items. */
export type CustomersConnection = {
  __typename?: 'CustomersConnection';
  /** A list of edges. */
  edges?: Maybe<Array<CustomersEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Customer>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type CustomersEdge = {
  __typename?: 'CustomersEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Customer;
};

/** Data Handling Unit */
export type DataHandlingUnit = {
  __typename?: 'DataHandlingUnit';
  /** Optional: The FirmwareNumber of the device, represented as an string. */
  firmwareNumber: Scalars['String']['output'];
  /** Required: The hardware part number, which consists of a base number (e.g., 7556555) followed by a hyphen and a three-digit extension (e.g., 001). */
  hardwarePartNumber: Scalars['String']['output'];
  /** Required: The International Mobile Equipment Identity (IMEI) is a number, usually unique, to identify 3GPP and iDEN mobile phones, as well as some satellite phones. */
  imei: Scalars['String']['output'];
  /** Required: The International Mobile Subscriber Identity (IMSI) is a unique number associated with all GSM and UMTS network mobile phone users. */
  imsi: Scalars['String']['output'];
  /** Optional: Indicates whether the communication is currently turned on in the DHU. DHU is still listening for communication. */
  isCommunicationOn: Scalars['Boolean']['output'];
  /** Optional: Indicates whether the modem is currently turned on in the DHU. */
  isModemOn: Scalars['Boolean']['output'];
  /** Optional: The serial number of the device, which is a unique identifier assigned to each individual unit and is represented as an string. */
  serialNumber: Scalars['String']['output'];
  /** Required: The DhuType enumeration represents different types of DHU devices, including Dhu1, Dhu2, Dhu2Plus, Dhu3, and Dhu4. */
  type: DhuType;
};

/** Data Handling Unit */
export type DataHandlingUnitFilterInput = {
  and?: InputMaybe<Array<DataHandlingUnitFilterInput>>;
  /** Optional: The FirmwareNumber of the device, represented as an string. */
  firmwareNumber?: InputMaybe<StringOperationFilterInput>;
  /** Required: The hardware part number, which consists of a base number (e.g., 7556555) followed by a hyphen and a three-digit extension (e.g., 001). */
  hardwarePartNumber?: InputMaybe<StringOperationFilterInput>;
  /** Required: The International Mobile Equipment Identity (IMEI) is a number, usually unique, to identify 3GPP and iDEN mobile phones, as well as some satellite phones. */
  imei?: InputMaybe<StringOperationFilterInput>;
  /** Required: The International Mobile Subscriber Identity (IMSI) is a unique number associated with all GSM and UMTS network mobile phone users. */
  imsi?: InputMaybe<StringOperationFilterInput>;
  /** Optional: Indicates whether the communication is currently turned on in the DHU. DHU is still listening for communication. */
  isCommunicationOn?: InputMaybe<BooleanOperationFilterInput>;
  /** Optional: Indicates whether the modem is currently turned on in the DHU. */
  isModemOn?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<DataHandlingUnitFilterInput>>;
  /** Optional: The serial number of the device, which is a unique identifier assigned to each individual unit and is represented as an string. */
  serialNumber?: InputMaybe<StringOperationFilterInput>;
  /** Required: The DhuType enumeration represents different types of DHU devices, including Dhu1, Dhu2, Dhu2Plus, Dhu3, and Dhu4. */
  type?: InputMaybe<DhuTypeOperationFilterInput>;
};

/** Data Handling Unit */
export type DataHandlingUnitSortInput = {
  /** Optional: The FirmwareNumber of the device, represented as an string. */
  firmwareNumber?: InputMaybe<SortEnumType>;
  /** Required: The hardware part number, which consists of a base number (e.g., 7556555) followed by a hyphen and a three-digit extension (e.g., 001). */
  hardwarePartNumber?: InputMaybe<SortEnumType>;
  /** Required: The International Mobile Equipment Identity (IMEI) is a number, usually unique, to identify 3GPP and iDEN mobile phones, as well as some satellite phones. */
  imei?: InputMaybe<SortEnumType>;
  /** Required: The International Mobile Subscriber Identity (IMSI) is a unique number associated with all GSM and UMTS network mobile phone users. */
  imsi?: InputMaybe<SortEnumType>;
  /** Optional: Indicates whether the communication is currently turned on in the DHU. DHU is still listening for communication. */
  isCommunicationOn?: InputMaybe<SortEnumType>;
  /** Optional: Indicates whether the modem is currently turned on in the DHU. */
  isModemOn?: InputMaybe<SortEnumType>;
  /** Optional: The serial number of the device, which is a unique identifier assigned to each individual unit and is represented as an string. */
  serialNumber?: InputMaybe<SortEnumType>;
  /** Required: The DhuType enumeration represents different types of DHU devices, including Dhu1, Dhu2, Dhu2Plus, Dhu3, and Dhu4. */
  type?: InputMaybe<SortEnumType>;
};

export type DateTimeOperationFilterInput = {
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  neq?: InputMaybe<Scalars['DateTime']['input']>;
  ngt?: InputMaybe<Scalars['DateTime']['input']>;
  ngte?: InputMaybe<Scalars['DateTime']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  nlt?: InputMaybe<Scalars['DateTime']['input']>;
  nlte?: InputMaybe<Scalars['DateTime']['input']>;
};

/** A department within an organization. */
export type Department = {
  __typename?: 'Department';
  childDepartments?: Maybe<ChildDepartmentsConnection>;
  /** Required: The country code of where the department is located. For example SE or DE. */
  countryCode: Scalars['String']['output'];
  customers?: Maybe<CustomersConnection>;
  /** Optional: A unique identifier of the department in the ERP system. */
  erpId?: Maybe<Scalars['String']['output']>;
  /** The unique identifier of the department. */
  id: Scalars['UUID']['output'];
  /** Required: The name of the department. */
  name: Scalars['String']['output'];
  parentDepartment?: Maybe<Department>;
  parentId?: Maybe<Scalars['UUID']['output']>;
  /** Required: The type of the department. */
  type: DepartmentType;
};


/** A department within an organization. */
export type DepartmentChildDepartmentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<DepartmentFilterInput>;
};


/** A department within an organization. */
export type DepartmentCustomersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CustomerFilterInput>;
};


/** A department within an organization. */
export type DepartmentParentDepartmentArgs = {
  where?: InputMaybe<DepartmentFilterInput>;
};

export type DepartmentCreateInput = {
  countryCode: Scalars['String']['input'];
  erpId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['UUID']['input']>;
  type: DepartmentType;
};

/** A department within an organization. */
export type DepartmentFilterInput = {
  and?: InputMaybe<Array<DepartmentFilterInput>>;
  /** Required: The country code of where the department is located. For example SE or DE. */
  countryCode?: InputMaybe<StringOperationFilterInput>;
  /** Optional: A unique identifier of the {className} in the ERP system. */
  erpId?: InputMaybe<StringOperationFilterInput>;
  /** The unique identifier of the {className}. */
  id?: InputMaybe<UuidOperationFilterInput>;
  /** Required: The name of the department. */
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<DepartmentFilterInput>>;
  parentId?: InputMaybe<UuidOperationFilterInput>;
  /** Required: The type of the department. */
  type?: InputMaybe<DepartmentTypeOperationFilterInput>;
};

/** A department within an organization. */
export type DepartmentSortInput = {
  /** Required: The country code of where the department is located. For example SE or DE. */
  countryCode?: InputMaybe<SortEnumType>;
  /** Optional: A unique identifier of the {className} in the ERP system. */
  erpId?: InputMaybe<SortEnumType>;
  /** The unique identifier of the {className}. */
  id?: InputMaybe<SortEnumType>;
  /** Required: The name of the department. */
  name?: InputMaybe<SortEnumType>;
  parentId?: InputMaybe<SortEnumType>;
  /** Required: The type of the department. */
  type?: InputMaybe<SortEnumType>;
};

export enum DepartmentType {
  Internal = 'INTERNAL',
  Market = 'MARKET'
}

export type DepartmentTypeOperationFilterInput = {
  eq?: InputMaybe<DepartmentType>;
  in?: InputMaybe<Array<DepartmentType>>;
  neq?: InputMaybe<DepartmentType>;
  nin?: InputMaybe<Array<DepartmentType>>;
};

export type DepartmentUpdateInput = {
  countryCode?: InputMaybe<Scalars['String']['input']>;
  erpId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of items. */
export type DepartmentsConnection = {
  __typename?: 'DepartmentsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<DepartmentsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Department>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type DepartmentsEdge = {
  __typename?: 'DepartmentsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Department;
};

export enum DhuType {
  Dhu1 = 'DHU1',
  Dhu2 = 'DHU2',
  Dhu2Plus = 'DHU2_PLUS',
  Dhu3 = 'DHU3',
  Dhu4 = 'DHU4',
  NotAvailable = 'NOT_AVAILABLE'
}

export type DhuTypeOperationFilterInput = {
  eq?: InputMaybe<DhuType>;
  in?: InputMaybe<Array<DhuType>>;
  neq?: InputMaybe<DhuType>;
  nin?: InputMaybe<Array<DhuType>>;
};

export enum Energy {
  Diesel = 'DIESEL',
  Electric = 'ELECTRIC',
  LpgPetrol = 'LPG_PETROL',
  NotAvailable = 'NOT_AVAILABLE'
}

export type Error = {
  message: Scalars['String']['output'];
};

export enum FamilyCode {
  Cbe = 'CBE',
  Cbi = 'CBI',
  Han = 'HAN',
  Low = 'LOW',
  NotAvailable = 'NOT_AVAILABLE',
  Oth = 'OTH',
  Pic = 'PIC',
  Rea = 'REA',
  Sta = 'STA',
  Tow = 'TOW',
  Vna = 'VNA'
}

export type HeightPreSelect = {
  __typename?: 'HeightPreSelect';
  /** The maximum height the HPS should guide to, at the location. For a deposit job type, this will be the height to which HPS will move the forks on approach to the location (first phase of the HPS sequence). For a pickup job type, this will be the height to which HPS will raise the forks when picking up the material (second phase of the HPS sequence). */
  maxHeight: Scalars['Int']['output'];
  /** The minimum height the HPS should guide to, at the location. For a deposit job type, this will be the height to which HPS will lower the forks when depositing the material (second phase of the HPS sequence). For a pickup job type, this will be the height to which HPS will move the forks on approach to the location (first phase of the HPS sequence). */
  minHeight: Scalars['Int']['output'];
  /** The status of the HPS job. */
  status: HeightPreSelectStatus;
  /** The type of HPS job. Will provide hints to the HPS behavior of the machine */
  type: HeightPreSelectJobType;
};

export type HeightPreSelectFilterInput = {
  and?: InputMaybe<Array<HeightPreSelectFilterInput>>;
  /** The maximum height the HPS should guide to, at the location. For a deposit job type, this will be the height to which HPS will move the forks on approach to the location (first phase of the HPS sequence). For a pickup job type, this will be the height to which HPS will raise the forks when picking up the material (second phase of the HPS sequence). */
  maxHeight?: InputMaybe<IntOperationFilterInput>;
  /** The minimum height the HPS should guide to, at the location. For a deposit job type, this will be the height to which HPS will lower the forks when depositing the material (second phase of the HPS sequence). For a pickup job type, this will be the height to which HPS will move the forks on approach to the location (first phase of the HPS sequence). */
  minHeight?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<HeightPreSelectFilterInput>>;
  /** The status of the HPS job. */
  status?: InputMaybe<HeightPreSelectStatusOperationFilterInput>;
  /** The type of HPS job. Will provide hints to the HPS behavior of the machine */
  type?: InputMaybe<HeightPreSelectJobTypeOperationFilterInput>;
};

export enum HeightPreSelectJobType {
  /** Depositing materials (aka leaving/putting/placing/storing goods/pallets/packages). Gives a hint to the machine that HPS should enter the deposit location at the MAX height and exit at the MIN height. */
  Deposit = 'DEPOSIT',
  /** Manually picking orders. HPS will lift to the MIN height. */
  OrderPicking = 'ORDER_PICKING',
  /** Picking up materials (aka fetching/retrieving/collecting goods/pallets/packages). Gives a hint to the machine that HPS should enter the pickup location at the MIN height and exit at the MAX height. */
  Pickup = 'PICKUP'
}

export type HeightPreSelectJobTypeOperationFilterInput = {
  eq?: InputMaybe<HeightPreSelectJobType>;
  in?: InputMaybe<Array<HeightPreSelectJobType>>;
  neq?: InputMaybe<HeightPreSelectJobType>;
  nin?: InputMaybe<Array<HeightPreSelectJobType>>;
};

export type HeightPreSelectSettingsInput = {
  /** The maximum height the HPS should guide to, at the location. For a deposit job type, this will be the height to which HPS will move the forks on approach to the location (first phase of the HPS sequence). For a pickup job type, this will be the height to which HPS will raise the forks when picking up the material (second phase of the HPS sequence). */
  maxHeight: Scalars['Int']['input'];
  /** The minimum height the HPS should guide to, at the location. For a deposit job type, this will be the height to which HPS will lower the forks when depositing the material (second phase of the HPS sequence). For a pickup job type, this will be the height to which HPS will move the forks on approach to the location (first phase of the HPS sequence). */
  minHeight: Scalars['Int']['input'];
  /** The type of HPS job. Will provide hints to the HPS behavior of the machine */
  type: HeightPreSelectJobType;
};

export type HeightPreSelectSortInput = {
  /** The maximum height the HPS should guide to, at the location. For a deposit job type, this will be the height to which HPS will move the forks on approach to the location (first phase of the HPS sequence). For a pickup job type, this will be the height to which HPS will raise the forks when picking up the material (second phase of the HPS sequence). */
  maxHeight?: InputMaybe<SortEnumType>;
  /** The minimum height the HPS should guide to, at the location. For a deposit job type, this will be the height to which HPS will lower the forks when depositing the material (second phase of the HPS sequence). For a pickup job type, this will be the height to which HPS will move the forks on approach to the location (first phase of the HPS sequence). */
  minHeight?: InputMaybe<SortEnumType>;
  /** The status of the HPS job. */
  status?: InputMaybe<SortEnumType>;
  /** The type of HPS job. Will provide hints to the HPS behavior of the machine */
  type?: InputMaybe<SortEnumType>;
};

export enum HeightPreSelectStatus {
  /** The HPS job has been accepted by the operator. */
  AcceptedByOperator = 'ACCEPTED_BY_OPERATOR',
  /** The HPS job has been completed. */
  Completed = 'COMPLETED',
  /** The HPS job has failed. */
  Failed = 'FAILED',
  /** The HPS job has not been accepted by the operator within time. */
  IgnoredByOperator = 'IGNORED_BY_OPERATOR',
  /** The HPS job is pending and has not been processed yet. */
  Pending = 'PENDING',
  /** The HPS job has been received by the machine and made available for the operator to use. */
  ReceivedByMachine = 'RECEIVED_BY_MACHINE',
  /** The HPS job has been actively rejected by the operator. */
  RejectedByOperator = 'REJECTED_BY_OPERATOR'
}

export type HeightPreSelectStatusOperationFilterInput = {
  eq?: InputMaybe<HeightPreSelectStatus>;
  in?: InputMaybe<Array<HeightPreSelectStatus>>;
  neq?: InputMaybe<HeightPreSelectStatus>;
  nin?: InputMaybe<Array<HeightPreSelectStatus>>;
};

export type ISiteContract = {
  __typename?: 'ISiteContract';
  /** Required: The plan (Basic or Explorer) associated with the I_Site contract. */
  contractPlan: ContractPlanType;
  /** Required: The end date for the I_Site contract period, indicating when the contract ends. */
  endDate: Scalars['DateTime']['output'];
  /** Required: The ERP ID associated with the rental contract, used to uniquely identify the contract within the ERP system. */
  erpId: Scalars['String']['output'];
  /** Required: The ID of the customer or department that is responsible for paying the I_Site contract. */
  paidById: Scalars['UUID']['output'];
  /** Required: The type of entity(customer or department) that is responsible for paying the I_Site contract. */
  paidByType: PayerOfType;
  /** Required: The start date for the I_Site contract period, indicating when the contract begins. */
  startDate: Scalars['DateTime']['output'];
};

export type ISiteContractFilterInput = {
  and?: InputMaybe<Array<ISiteContractFilterInput>>;
  /** Required: The plan (Basic or Explorer) associated with the I_Site contract. */
  contractPlan?: InputMaybe<ContractPlanTypeOperationFilterInput>;
  /** Required: The end date for the I_Site contract period, indicating when the contract ends. */
  endDate?: InputMaybe<DateTimeOperationFilterInput>;
  /** Required: The ERP ID associated with the rental contract, used to uniquely identify the contract within the ERP system. */
  erpId?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<ISiteContractFilterInput>>;
  /** Required: The ID of the customer or department that is responsible for paying the I_Site contract. */
  paidById?: InputMaybe<UuidOperationFilterInput>;
  /** Required: The type of entity(customer or department) that is responsible for paying the I_Site contract. */
  paidByType?: InputMaybe<PayerOfTypeOperationFilterInput>;
  /** Required: The start date for the I_Site contract period, indicating when the contract begins. */
  startDate?: InputMaybe<DateTimeOperationFilterInput>;
};

export type ISiteContractInput = {
  /** Required: The plan (Basic or Explorer) associated with the I_Site contract. */
  contractPlan: ContractPlanType;
  /** Required: The end date for the I_Site contract period, indicating when the contract ends. */
  endDate: Scalars['DateTime']['input'];
  /** Required: The ERP ID associated with the rental contract, used to uniquely identify the contract within the ERP system. */
  erpId: Scalars['String']['input'];
  /** Required: The ID of the customer or department that is responsible for paying the I_Site contract. */
  paidById: Scalars['UUID']['input'];
  /** Required: The type of entity(customer or department) that is responsible for paying the I_Site contract. */
  paidByType: PayerOfType;
  /** Required: The start date for the I_Site contract period, indicating when the contract begins. */
  startDate: Scalars['DateTime']['input'];
};

export type ISiteContractSortInput = {
  /** Required: The plan (Basic or Explorer) associated with the I_Site contract. */
  contractPlan?: InputMaybe<SortEnumType>;
  /** Required: The end date for the I_Site contract period, indicating when the contract ends. */
  endDate?: InputMaybe<SortEnumType>;
  /** Required: The ERP ID associated with the rental contract, used to uniquely identify the contract within the ERP system. */
  erpId?: InputMaybe<SortEnumType>;
  /** Required: The ID of the customer or department that is responsible for paying the I_Site contract. */
  paidById?: InputMaybe<SortEnumType>;
  /** Required: The type of entity(customer or department) that is responsible for paying the I_Site contract. */
  paidByType?: InputMaybe<SortEnumType>;
  /** Required: The start date for the I_Site contract period, indicating when the contract begins. */
  startDate?: InputMaybe<SortEnumType>;
};

export type IntOperationFilterInput = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
  ngt?: InputMaybe<Scalars['Int']['input']>;
  ngte?: InputMaybe<Scalars['Int']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  nlt?: InputMaybe<Scalars['Int']['input']>;
  nlte?: InputMaybe<Scalars['Int']['input']>;
};

export type LongOperationFilterInput = {
  eq?: InputMaybe<Scalars['Long']['input']>;
  gt?: InputMaybe<Scalars['Long']['input']>;
  gte?: InputMaybe<Scalars['Long']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Long']['input']>>>;
  lt?: InputMaybe<Scalars['Long']['input']>;
  lte?: InputMaybe<Scalars['Long']['input']>;
  neq?: InputMaybe<Scalars['Long']['input']>;
  ngt?: InputMaybe<Scalars['Long']['input']>;
  ngte?: InputMaybe<Scalars['Long']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Long']['input']>>>;
  nlt?: InputMaybe<Scalars['Long']['input']>;
  nlte?: InputMaybe<Scalars['Long']['input']>;
};

/** Represents a machine with various attributes such as unique identifiers, serial number, communication details, metrics, settings, and ownership information. */
export type Machine = {
  __typename?: 'Machine';
  /** The brand of the machine, represented by a pre-defined code. The code needs to match an existing Brands code in I_site. */
  brand?: Maybe<Brand>;
  /** Optional: The Data Handling Unit (DHU) associated with this entity. By default, this is set to false. It should be updated by I_site. */
  dhu?: Maybe<DataHandlingUnit>;
  /** Optional: The type of energy used by the machine. This indicates whether the machine uses (Diesel), (Electric), (LPGPetrol,), or if the energy type is not available(NotAvailable). */
  energy?: Maybe<Energy>;
  /** Optional: A unique identifier of the machine in the ERP system. */
  erpId?: Maybe<Scalars['String']['output']>;
  /**
   * Optional: The type of machine, represented by a predefined set of codes. The FamilyCode indicates the machine family and must be one of the following predefined codes:
   * Cbi - CB IC
   * Cbe - CB Electric
   * Sta - Stackers
   * Pic - Order Pickers
   * Vna - VNA Trucks
   * Rea - Reach Trucks
   * Low - Low Lifters
   * Tow - Tow Tractors
   * Han - Hand Pallet Trucks
   * Oth - Other equipment
   */
  familyCode?: Maybe<FamilyCode>;
  /** Optional: The customer-assigned name for the machine. */
  fleetNo?: Maybe<Scalars['String']['output']>;
  /** Optional: Settings for automatic Height Pre-Select (HPS). This function allows setting a defined stop height before lifting or lowering, making the forks stop at the defined height automatically. */
  heightPreSelect?: Maybe<HeightPreSelect>;
  /** Optional: Details the customer's I_Site subscription, including the plan (Basic or Explorer), purchaser information, and an ERP system contract ID for traceability. */
  iSiteContract?: Maybe<ISiteContract>;
  /** The unique identifier of the machine. */
  id: Scalars['UUID']['output'];
  /** Optional: Indicates whether the Operator should be included in the data sent from DHU to the cloud. */
  includeOperatorInActivities?: Maybe<Scalars['Boolean']['output']>;
  /** The timestamp of the most recent modification to the machine document. */
  lastUpdatedUtc?: Maybe<Scalars['DateTime']['output']>;
  /** The timestamp of the machine's last communication, in UTC. */
  latestCommunication?: Maybe<Scalars['DateTime']['output']>;
  /** Optional: Holds the latest metrics from the machine. This property is updated automatically by the machine. */
  latestMetrics?: Maybe<MachineMetricsModel>;
  /** Optional: The lift capacity of the machine. If not specified, this can be null. However, if the lift capacity is not set or is negative, it is considered as -1. */
  liftCapacity?: Maybe<Scalars['Int']['output']>;
  /** The model of the machine. This property specifies the machine's model name. */
  model?: Maybe<Scalars['String']['output']>;
  /** Optional: The name of the machine. If the Name is not provided, the SerialNumber will be used instead. */
  name?: Maybe<Scalars['String']['output']>;
  /** Optional: The contract associated with TypeOfOwnership set to LongTermRental, providing detailed terms and conditions. If TypeOfOwnership is not LongTermRental, this should be null. */
  rentalContract?: Maybe<RentalContract>;
  /** Required: The serial number of the machine. It must be unique within the I_site. */
  serialNumber: Scalars['String']['output'];
  site?: Maybe<Site>;
  /** Represents the unique identifier for the site. */
  siteId: Scalars['UUID']['output'];
  /** Indicates whether the machine is active in the ERP system. This is a boolean value used by ERP to determine the machine's status. */
  status: Scalars['Boolean']['output'];
  /** Optional: The TcsPackageVersion, which consists of a base number (e.g., 1234567) followed by a hyphen and a three-digit extension (e.g., 001). */
  tcsPackageVersion?: Maybe<Scalars['String']['output']>;
  /** Optional: The type of ownership for the machine. This indicates whether the machine is owned by others(OTHERS), rented for a short term(SHORT_TERM_RENTAL), rented for a long term (LONG_TERM_RENTAL), owned by a customer(CUSTOMER_OWNED), or used as a demo (DEMO). */
  typeOfOwnership?: Maybe<TypeOfOwnership>;
  /** Optional: The year model of the machine. If not specified, this can be null. However, if the year model is not set or is negative, it is considered as -1. */
  yearModel?: Maybe<Scalars['Int']['output']>;
};


/** Represents a machine with various attributes such as unique identifiers, serial number, communication details, metrics, settings, and ownership information. */
export type MachineSiteArgs = {
  where?: InputMaybe<SiteFilterInput>;
};

export type MachineCreateInput = {
  brandCode: Scalars['String']['input'];
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  energy?: InputMaybe<Energy>;
  erpId?: InputMaybe<Scalars['String']['input']>;
  familyCode?: InputMaybe<FamilyCode>;
  fleetNo?: InputMaybe<Scalars['String']['input']>;
  iSiteContract?: InputMaybe<ISiteContractInput>;
  liftCapacity?: InputMaybe<Scalars['Int']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  rentalContract?: InputMaybe<RentalContractInput>;
  serialNumber: Scalars['String']['input'];
  siteId: Scalars['UUID']['input'];
  status: Scalars['Boolean']['input'];
  typeOfOwnership?: InputMaybe<TypeOfOwnership>;
  yearModel?: InputMaybe<Scalars['Int']['input']>;
};

/** Represents a machine with various attributes such as unique identifiers, serial number, communication details, metrics, settings, and ownership information. */
export type MachineFilterInput = {
  and?: InputMaybe<Array<MachineFilterInput>>;
  /** The brand of the machine, represented by a pre-defined code. The code needs to match an existing Brands code in I_site. */
  brand?: InputMaybe<BrandFilterInput>;
  /** Optional: The Data Handling Unit (DHU) associated with this entity. By default, this is set to false. It should be updated by I_site. */
  dhu?: InputMaybe<DataHandlingUnitFilterInput>;
  /** Optional: The type of energy used by the machine. This indicates whether the machine uses (Diesel), (Electric), (LPGPetrol,), or if the energy type is not available(NotAvailable). */
  energy?: InputMaybe<NullableOfEnergyOperationFilterInput>;
  /** Optional: A unique identifier of the {className} in the ERP system. */
  erpId?: InputMaybe<StringOperationFilterInput>;
  /**
   * Optional: The type of machine, represented by a predefined set of codes. The FamilyCode indicates the machine family and must be one of the following predefined codes:
   * Cbi - CB IC
   * Cbe - CB Electric
   * Sta - Stackers
   * Pic - Order Pickers
   * Vna - VNA Trucks
   * Rea - Reach Trucks
   * Low - Low Lifters
   * Tow - Tow Tractors
   * Han - Hand Pallet Trucks
   * Oth - Other equipment
   */
  familyCode?: InputMaybe<NullableOfFamilyCodeOperationFilterInput>;
  /** Optional: The customer-assigned name for the machine. */
  fleetNo?: InputMaybe<StringOperationFilterInput>;
  /** Optional: Settings for automatic Height Pre-Select (HPS). This function allows setting a defined stop height before lifting or lowering, making the forks stop at the defined height automatically. */
  heightPreSelect?: InputMaybe<HeightPreSelectFilterInput>;
  /** Optional: Details the customer's I_Site subscription, including the plan (Basic or Explorer), purchaser information, and an ERP system contract ID for traceability. */
  iSiteContract?: InputMaybe<ISiteContractFilterInput>;
  /** The unique identifier of the {className}. */
  id?: InputMaybe<UuidOperationFilterInput>;
  /** Optional: Indicates whether the Operator should be included in the data sent from DHU to the cloud. */
  includeOperatorInActivities?: InputMaybe<BooleanOperationFilterInput>;
  /** The timestamp of the most recent modification to the machine document. */
  lastUpdatedUtc?: InputMaybe<DateTimeOperationFilterInput>;
  /** The timestamp of the machine's last communication, in UTC. */
  latestCommunication?: InputMaybe<DateTimeOperationFilterInput>;
  /** Optional: Holds the latest metrics from the machine. This property is updated automatically by the machine. */
  latestMetrics?: InputMaybe<MachineMetricsModelFilterInput>;
  /** Optional: The lift capacity of the machine. If not specified, this can be null. However, if the lift capacity is not set or is negative, it is considered as -1. */
  liftCapacity?: InputMaybe<IntOperationFilterInput>;
  /** The model of the machine. This property specifies the machine's model name. */
  model?: InputMaybe<StringOperationFilterInput>;
  /** Optional: The name of the machine. If the Name is not provided, the SerialNumber will be used instead. */
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<MachineFilterInput>>;
  /** Optional: The contract associated with TypeOfOwnership set to LongTermRental, providing detailed terms and conditions. If TypeOfOwnership is not LongTermRental, this should be null. */
  rentalContract?: InputMaybe<RentalContractFilterInput>;
  /** Required: The serial number of the machine. It must be unique within the I_site. */
  serialNumber?: InputMaybe<StringOperationFilterInput>;
  /** Represents the unique identifier for the site. */
  siteId?: InputMaybe<UuidOperationFilterInput>;
  /** Indicates whether the machine is active in the ERP system. This is a boolean value used by ERP to determine the machine's status. */
  status?: InputMaybe<BooleanOperationFilterInput>;
  /** Optional: The TcsPackageVersion, which consists of a base number (e.g., 1234567) followed by a hyphen and a three-digit extension (e.g., 001). */
  tcsPackageVersion?: InputMaybe<StringOperationFilterInput>;
  /** Optional: The type of ownership for the machine. This indicates whether the machine is owned by others(OTHERS), rented for a short term(SHORT_TERM_RENTAL), rented for a long term (LONG_TERM_RENTAL), owned by a customer(CUSTOMER_OWNED), or used as a demo (DEMO). */
  typeOfOwnership?: InputMaybe<NullableOfTypeOfOwnershipOperationFilterInput>;
  /** Optional: The year model of the machine. If not specified, this can be null. However, if the year model is not set or is negative, it is considered as -1. */
  yearModel?: InputMaybe<IntOperationFilterInput>;
};

export type MachineMetricsModel = {
  __typename?: 'MachineMetricsModel';
  /** A-time (Key-On): The total hours the truck’s starter key is switched to the on position. */
  aHours: Scalars['Long']['output'];
  /** B-time (Driving, Lifting or other Hydraulics): The total hours any of the truck’s motors (including steering servo) are active. */
  bHours: Scalars['Long']['output'];
  /** C-time (Driving): The total hours the truck has been driven. */
  cHours: Scalars['Long']['output'];
  /** D-time (Lifting): The total hours the truck's lift motor has been active. */
  dHours: Scalars['Long']['output'];
  /** E-time (Ergo/Initial/T-Mote): Used for different purposes on different machines—RRE: Ergo cabin tilt active hours, VCE: Initial lift active hours, OSE: T-Mote active hours. */
  eHours: Scalars['Long']['output'];
  /** F-time (Operator presence/availability time): The total hours the truck operator is present. */
  fHours: Scalars['Long']['output'];
  /** S-time (Service): Time remaining until the next service. Can be negative if service is overdue. */
  sHours: Scalars['Long']['output'];
};

export type MachineMetricsModelFilterInput = {
  /** A-time (Key-On): The total hours the truck’s starter key is switched to the on position. */
  aHours?: InputMaybe<LongOperationFilterInput>;
  and?: InputMaybe<Array<MachineMetricsModelFilterInput>>;
  /** B-time (Driving, Lifting or other Hydraulics): The total hours any of the truck’s motors (including steering servo) are active. */
  bHours?: InputMaybe<LongOperationFilterInput>;
  /** C-time (Driving): The total hours the truck has been driven. */
  cHours?: InputMaybe<LongOperationFilterInput>;
  /** D-time (Lifting): The total hours the truck's lift motor has been active. */
  dHours?: InputMaybe<LongOperationFilterInput>;
  /** E-time (Ergo/Initial/T-Mote): Used for different purposes on different machines—RRE: Ergo cabin tilt active hours, VCE: Initial lift active hours, OSE: T-Mote active hours. */
  eHours?: InputMaybe<LongOperationFilterInput>;
  /** F-time (Operator presence/availability time): The total hours the truck operator is present. */
  fHours?: InputMaybe<LongOperationFilterInput>;
  or?: InputMaybe<Array<MachineMetricsModelFilterInput>>;
  /** S-time (Service): Time remaining until the next service. Can be negative if service is overdue. */
  sHours?: InputMaybe<LongOperationFilterInput>;
};

export type MachineMetricsModelSortInput = {
  /** A-time (Key-On): The total hours the truck’s starter key is switched to the on position. */
  aHours?: InputMaybe<SortEnumType>;
  /** B-time (Driving, Lifting or other Hydraulics): The total hours any of the truck’s motors (including steering servo) are active. */
  bHours?: InputMaybe<SortEnumType>;
  /** C-time (Driving): The total hours the truck has been driven. */
  cHours?: InputMaybe<SortEnumType>;
  /** D-time (Lifting): The total hours the truck's lift motor has been active. */
  dHours?: InputMaybe<SortEnumType>;
  /** E-time (Ergo/Initial/T-Mote): Used for different purposes on different machines—RRE: Ergo cabin tilt active hours, VCE: Initial lift active hours, OSE: T-Mote active hours. */
  eHours?: InputMaybe<SortEnumType>;
  /** F-time (Operator presence/availability time): The total hours the truck operator is present. */
  fHours?: InputMaybe<SortEnumType>;
  /** S-time (Service): Time remaining until the next service. Can be negative if service is overdue. */
  sHours?: InputMaybe<SortEnumType>;
};

/** Represents a machine with various attributes such as unique identifiers, serial number, communication details, metrics, settings, and ownership information. */
export type MachineSortInput = {
  /** The brand of the machine, represented by a pre-defined code. The code needs to match an existing Brands code in I_site. */
  brand?: InputMaybe<BrandSortInput>;
  /** Optional: The Data Handling Unit (DHU) associated with this entity. By default, this is set to false. It should be updated by I_site. */
  dhu?: InputMaybe<DataHandlingUnitSortInput>;
  /** Optional: The type of energy used by the machine. This indicates whether the machine uses (Diesel), (Electric), (LPGPetrol,), or if the energy type is not available(NotAvailable). */
  energy?: InputMaybe<SortEnumType>;
  /** Optional: A unique identifier of the {className} in the ERP system. */
  erpId?: InputMaybe<SortEnumType>;
  /**
   * Optional: The type of machine, represented by a predefined set of codes. The FamilyCode indicates the machine family and must be one of the following predefined codes:
   * Cbi - CB IC
   * Cbe - CB Electric
   * Sta - Stackers
   * Pic - Order Pickers
   * Vna - VNA Trucks
   * Rea - Reach Trucks
   * Low - Low Lifters
   * Tow - Tow Tractors
   * Han - Hand Pallet Trucks
   * Oth - Other equipment
   */
  familyCode?: InputMaybe<SortEnumType>;
  /** Optional: The customer-assigned name for the machine. */
  fleetNo?: InputMaybe<SortEnumType>;
  /** Optional: Settings for automatic Height Pre-Select (HPS). This function allows setting a defined stop height before lifting or lowering, making the forks stop at the defined height automatically. */
  heightPreSelect?: InputMaybe<HeightPreSelectSortInput>;
  /** Optional: Details the customer's I_Site subscription, including the plan (Basic or Explorer), purchaser information, and an ERP system contract ID for traceability. */
  iSiteContract?: InputMaybe<ISiteContractSortInput>;
  /** The unique identifier of the {className}. */
  id?: InputMaybe<SortEnumType>;
  /** Optional: Indicates whether the Operator should be included in the data sent from DHU to the cloud. */
  includeOperatorInActivities?: InputMaybe<SortEnumType>;
  /** The timestamp of the most recent modification to the machine document. */
  lastUpdatedUtc?: InputMaybe<SortEnumType>;
  /** The timestamp of the machine's last communication, in UTC. */
  latestCommunication?: InputMaybe<SortEnumType>;
  /** Optional: Holds the latest metrics from the machine. This property is updated automatically by the machine. */
  latestMetrics?: InputMaybe<MachineMetricsModelSortInput>;
  /** Optional: The lift capacity of the machine. If not specified, this can be null. However, if the lift capacity is not set or is negative, it is considered as -1. */
  liftCapacity?: InputMaybe<SortEnumType>;
  /** The model of the machine. This property specifies the machine's model name. */
  model?: InputMaybe<SortEnumType>;
  /** Optional: The name of the machine. If the Name is not provided, the SerialNumber will be used instead. */
  name?: InputMaybe<SortEnumType>;
  /** Optional: The contract associated with TypeOfOwnership set to LongTermRental, providing detailed terms and conditions. If TypeOfOwnership is not LongTermRental, this should be null. */
  rentalContract?: InputMaybe<RentalContractSortInput>;
  /** Required: The serial number of the machine. It must be unique within the I_site. */
  serialNumber?: InputMaybe<SortEnumType>;
  /** Represents the unique identifier for the site. */
  siteId?: InputMaybe<SortEnumType>;
  /** Indicates whether the machine is active in the ERP system. This is a boolean value used by ERP to determine the machine's status. */
  status?: InputMaybe<SortEnumType>;
  /** Optional: The TcsPackageVersion, which consists of a base number (e.g., 1234567) followed by a hyphen and a three-digit extension (e.g., 001). */
  tcsPackageVersion?: InputMaybe<SortEnumType>;
  /** Optional: The type of ownership for the machine. This indicates whether the machine is owned by others(OTHERS), rented for a short term(SHORT_TERM_RENTAL), rented for a long term (LONG_TERM_RENTAL), owned by a customer(CUSTOMER_OWNED), or used as a demo (DEMO). */
  typeOfOwnership?: InputMaybe<SortEnumType>;
  /** Optional: The year model of the machine. If not specified, this can be null. However, if the year model is not set or is negative, it is considered as -1. */
  yearModel?: InputMaybe<SortEnumType>;
};

export type MachineUpdateError = {
  __typename?: 'MachineUpdateError';
  message: Scalars['String']['output'];
};

export type MachineUpdateInput = {
  brandCode?: InputMaybe<Scalars['String']['input']>;
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  energy?: InputMaybe<Energy>;
  erpId?: InputMaybe<Scalars['String']['input']>;
  familyCode?: InputMaybe<FamilyCode>;
  fleetNo?: InputMaybe<Scalars['String']['input']>;
  iSiteContract?: InputMaybe<ISiteContractInput>;
  id: Scalars['UUID']['input'];
  liftCapacity?: InputMaybe<Scalars['Int']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  rentalContract?: InputMaybe<RentalContractInput>;
  serialNumber?: InputMaybe<Scalars['String']['input']>;
  siteId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<Scalars['Boolean']['input']>;
  typeOfOwnership?: InputMaybe<TypeOfOwnership>;
  yearModel?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of items. */
export type MachinesConnection = {
  __typename?: 'MachinesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<MachinesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Machine>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type MachinesEdge = {
  __typename?: 'MachinesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Machine;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create a new customer. */
  createCustomer: CreateCustomerPayload;
  /** Create a batch of customers. */
  createCustomers: CreateCustomersPayload;
  /** Create a new department. */
  createDepartment: CreateDepartmentPayload;
  /** Create a batch of departments. */
  createDepartments: CreateDepartmentsPayload;
  createMachine: CreateMachinePayload;
  createMachines: CreateMachinesPayload;
  /** Create a new site. */
  createSite: CreateSitePayload;
  /** Create a batch of new site. */
  createSites: CreateSitesPayload;
  /** Set the Height Pre-Select settings for a machine. */
  setHps: SetHpsPayload;
  /** Update an existing customer. */
  updateCustomer: UpdateCustomerPayload;
  /** Update a batch of customers. */
  updateCustomers: UpdateCustomersPayload;
  /** Update an existing department. */
  updateDepartment: UpdateDepartmentPayload;
  /** Update existing departments. */
  updateDepartments: UpdateDepartmentsPayload;
  updateErpId: UpdateErpIdPayload;
  updateMachine: UpdateMachinePayload;
  updateMachines: UpdateMachinesPayload;
  /** Update an existing site. */
  updateSite: UpdateSitePayload;
  /** Update existing sites. */
  updateSites: UpdateSitesPayload;
};


export type MutationCreateCustomerArgs = {
  input: CreateCustomerInput;
};


export type MutationCreateCustomersArgs = {
  input: CreateCustomersInput;
};


export type MutationCreateDepartmentArgs = {
  input: CreateDepartmentInput;
};


export type MutationCreateDepartmentsArgs = {
  input: CreateDepartmentsInput;
};


export type MutationCreateMachineArgs = {
  input: CreateMachineInput;
};


export type MutationCreateMachinesArgs = {
  input: CreateMachinesInput;
};


export type MutationCreateSiteArgs = {
  input: CreateSiteInput;
};


export type MutationCreateSitesArgs = {
  input: CreateSitesInput;
};


export type MutationSetHpsArgs = {
  input: SetHpsInput;
};


export type MutationUpdateCustomerArgs = {
  input: UpdateCustomerInput;
};


export type MutationUpdateCustomersArgs = {
  input: UpdateCustomersInput;
};


export type MutationUpdateDepartmentArgs = {
  input: UpdateDepartmentInput;
};


export type MutationUpdateDepartmentsArgs = {
  input: UpdateDepartmentsInput;
};


export type MutationUpdateErpIdArgs = {
  input: UpdateErpIdInput;
};


export type MutationUpdateMachineArgs = {
  input: UpdateMachineInput;
};


export type MutationUpdateMachinesArgs = {
  input: UpdateMachinesInput;
};


export type MutationUpdateSiteArgs = {
  input: UpdateSiteInput;
};


export type MutationUpdateSitesArgs = {
  input: UpdateSitesInput;
};

export type NotAllowedError = Error & {
  __typename?: 'NotAllowedError';
  message: Scalars['String']['output'];
};

export type NullableOfEnergyOperationFilterInput = {
  eq?: InputMaybe<Energy>;
  in?: InputMaybe<Array<InputMaybe<Energy>>>;
  neq?: InputMaybe<Energy>;
  nin?: InputMaybe<Array<InputMaybe<Energy>>>;
};

export type NullableOfFamilyCodeOperationFilterInput = {
  eq?: InputMaybe<FamilyCode>;
  in?: InputMaybe<Array<InputMaybe<FamilyCode>>>;
  neq?: InputMaybe<FamilyCode>;
  nin?: InputMaybe<Array<InputMaybe<FamilyCode>>>;
};

export type NullableOfTypeOfOwnershipOperationFilterInput = {
  eq?: InputMaybe<TypeOfOwnership>;
  in?: InputMaybe<Array<InputMaybe<TypeOfOwnership>>>;
  neq?: InputMaybe<TypeOfOwnership>;
  nin?: InputMaybe<Array<InputMaybe<TypeOfOwnership>>>;
};

export type OperationFailedError = Error & {
  __typename?: 'OperationFailedError';
  message: Scalars['String']['output'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** Indicates whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean']['output'];
  /** Indicates whether more edges exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export enum PayerOfType {
  Customer = 'CUSTOMER',
  Department = 'DEPARTMENT'
}

export type PayerOfTypeOperationFilterInput = {
  eq?: InputMaybe<PayerOfType>;
  in?: InputMaybe<Array<PayerOfType>>;
  neq?: InputMaybe<PayerOfType>;
  nin?: InputMaybe<Array<PayerOfType>>;
};

export type Query = {
  __typename?: 'Query';
  brands?: Maybe<BrandsConnection>;
  customers?: Maybe<CustomersConnection>;
  departments?: Maybe<DepartmentsConnection>;
  machines?: Maybe<MachinesConnection>;
  sites?: Maybe<SitesConnection>;
};


export type QueryBrandsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<BrandSortInput>>;
  where?: InputMaybe<BrandFilterInput>;
};


export type QueryCustomersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<CustomerSortInput>>;
  where?: InputMaybe<CustomerFilterInput>;
};


export type QueryDepartmentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<DepartmentSortInput>>;
  where?: InputMaybe<DepartmentFilterInput>;
};


export type QueryMachinesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<MachineSortInput>>;
  where?: InputMaybe<MachineFilterInput>;
};


export type QuerySitesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<SiteSortInput>>;
  where?: InputMaybe<SiteFilterInput>;
};

export type RentalContract = {
  __typename?: 'RentalContract';
  /** Required: The end date for the rental contract period, indicating when the rental agreement ends. */
  endDate: Scalars['DateTime']['output'];
  /** Required: The ERP ID associated with the rental contract, used to uniquely identify the contract within the ERP system. */
  erpId: Scalars['String']['output'];
  /** Required: The amount of hours the truck is expected to be used during the rental contract period. */
  quantity: Scalars['Int']['output'];
  /** Required: The start date for the rental contract period, indicating when the rental agreement begins. */
  startDate: Scalars['DateTime']['output'];
};

export type RentalContractFilterInput = {
  and?: InputMaybe<Array<RentalContractFilterInput>>;
  /** Required: The end date for the rental contract period, indicating when the rental agreement ends. */
  endDate?: InputMaybe<DateTimeOperationFilterInput>;
  /** Required: The ERP ID associated with the rental contract, used to uniquely identify the contract within the ERP system. */
  erpId?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<RentalContractFilterInput>>;
  /** Required: The amount of hours the truck is expected to be used during the rental contract period. */
  quantity?: InputMaybe<IntOperationFilterInput>;
  /** Required: The start date for the rental contract period, indicating when the rental agreement begins. */
  startDate?: InputMaybe<DateTimeOperationFilterInput>;
};

export type RentalContractInput = {
  /** Required: The end date for the rental contract period, indicating when the rental agreement ends. */
  endDate: Scalars['DateTime']['input'];
  /** Required: The ERP ID associated with the rental contract, used to uniquely identify the contract within the ERP system. */
  erpId: Scalars['String']['input'];
  /** Required: The amount of hours the truck is expected to be used during the rental contract period. */
  quantity: Scalars['Int']['input'];
  /** Required: The start date for the rental contract period, indicating when the rental agreement begins. */
  startDate: Scalars['DateTime']['input'];
};

export type RentalContractSortInput = {
  /** Required: The end date for the rental contract period, indicating when the rental agreement ends. */
  endDate?: InputMaybe<SortEnumType>;
  /** Required: The ERP ID associated with the rental contract, used to uniquely identify the contract within the ERP system. */
  erpId?: InputMaybe<SortEnumType>;
  /** Required: The amount of hours the truck is expected to be used during the rental contract period. */
  quantity?: InputMaybe<SortEnumType>;
  /** Required: The start date for the rental contract period, indicating when the rental agreement begins. */
  startDate?: InputMaybe<SortEnumType>;
};

export type SetHpsError = AssetNotFoundError | NotAllowedError | OperationFailedError;

export type SetHpsInput = {
  hps: HeightPreSelectSettingsInput;
  machineId: Scalars['ID']['input'];
};

export type SetHpsPayload = {
  __typename?: 'SetHpsPayload';
  errors?: Maybe<Array<SetHpsError>>;
  machine?: Maybe<Machine>;
};

/** Represents a specific warehouse site with various attributes such as unique identifiers, customer association, location details, and optional ERP system identifiers. */
export type Site = {
  __typename?: 'Site';
  /** Optional: The postal address of a site. */
  address?: Maybe<Address>;
  customer?: Maybe<Customer>;
  /** Required: A unique identifier for the customer. */
  customerId: Scalars['UUID']['output'];
  /** Optional: A unique identifier of the site in the ERP system. */
  erpId?: Maybe<Scalars['String']['output']>;
  /** The unique identifier of the site. */
  id: Scalars['UUID']['output'];
  machines?: Maybe<MachinesConnection>;
  /** Required: The name of the site. */
  name: Scalars['String']['output'];
  /** Optional: The site number, which is an optional identifier for the site. */
  siteNumber?: Maybe<Scalars['String']['output']>;
  /** Optional: The time zone of the site. For example, 'W. Europe Standard Time'. */
  timeZone?: Maybe<Scalars['String']['output']>;
};


/** Represents a specific warehouse site with various attributes such as unique identifiers, customer association, location details, and optional ERP system identifiers. */
export type SiteCustomerArgs = {
  where?: InputMaybe<CustomerFilterInput>;
};


/** Represents a specific warehouse site with various attributes such as unique identifiers, customer association, location details, and optional ERP system identifiers. */
export type SiteMachinesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<MachineFilterInput>;
};

export type SiteCreateInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  countryCode: Scalars['String']['input'];
  customerId: Scalars['UUID']['input'];
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  erpId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  postalCode?: InputMaybe<Scalars['String']['input']>;
  siteNumber?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
  timeZone: Scalars['String']['input'];
};

/** Represents a specific warehouse site with various attributes such as unique identifiers, customer association, location details, and optional ERP system identifiers. */
export type SiteFilterInput = {
  /** Optional: The postal address of a site. */
  address?: InputMaybe<AddressFilterInput>;
  and?: InputMaybe<Array<SiteFilterInput>>;
  /** Required: A unique identifier for the customer. */
  customerId?: InputMaybe<UuidOperationFilterInput>;
  /** Optional: A unique identifier of the {className} in the ERP system. */
  erpId?: InputMaybe<StringOperationFilterInput>;
  /** The unique identifier of the {className}. */
  id?: InputMaybe<UuidOperationFilterInput>;
  /** Required: The name of the site. */
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<SiteFilterInput>>;
  /** Optional: The site number, which is an optional identifier for the site. */
  siteNumber?: InputMaybe<StringOperationFilterInput>;
  /** Optional: The time zone of the site. For example, 'W. Europe Standard Time'. */
  timeZone?: InputMaybe<StringOperationFilterInput>;
};

/** Represents a specific warehouse site with various attributes such as unique identifiers, customer association, location details, and optional ERP system identifiers. */
export type SiteSortInput = {
  /** Optional: The postal address of a site. */
  address?: InputMaybe<AddressSortInput>;
  /** Required: A unique identifier for the customer. */
  customerId?: InputMaybe<SortEnumType>;
  /** Optional: A unique identifier of the {className} in the ERP system. */
  erpId?: InputMaybe<SortEnumType>;
  /** The unique identifier of the {className}. */
  id?: InputMaybe<SortEnumType>;
  /** Required: The name of the site. */
  name?: InputMaybe<SortEnumType>;
  /** Optional: The site number, which is an optional identifier for the site. */
  siteNumber?: InputMaybe<SortEnumType>;
  /** Optional: The time zone of the site. For example, 'W. Europe Standard Time'. */
  timeZone?: InputMaybe<SortEnumType>;
};

export type SiteUpdateInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  countryCode?: InputMaybe<Scalars['String']['input']>;
  customerId?: InputMaybe<Scalars['UUID']['input']>;
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  erpId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  siteNumber?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
  timeZone?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of items. */
export type SitesConnection = {
  __typename?: 'SitesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<SitesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Site>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type SitesEdge = {
  __typename?: 'SitesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Site;
};

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StringOperationFilterInput = {
  and?: InputMaybe<Array<StringOperationFilterInput>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ncontains?: InputMaybe<Scalars['String']['input']>;
  nendsWith?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  nstartsWith?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<StringOperationFilterInput>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Subscription for machine changes on any machine. */
  machineChanged: Machine;
  /** Subscription for DHU firmware number changes on a specific machine. */
  machineDhuFirmwareNumberChanged: Machine;
  /** Subscription for Dhu IsCommunicationOn changes on a specific machine. */
  machineDhuIsCommunicationChanged: Machine;
  /** Subscription for DHU serial number changes on a specific machine. */
  machineDhuSerialNumberChanged: Machine;
  /** Subscription for HPS changes on a specific machine. */
  machineHpsSet: Machine;
  /** Subscription for machine metrics changes on a specific machine. */
  machineMetricsChanged: Machine;
  /** Subscription for TCS package version changes on a specific machine. */
  machineTcsPackageVersionChanged: Machine;
  /** Subscription for DHU firmware number changes on any machine. */
  machinesDhuFirmwareNumberChanged: Machine;
  /** Subscription for Dhu IsCommunicationOn changes on any machine. */
  machinesDhuIsCommunicationChanged: Machine;
  /** Subscription for DHU serial number changes on any machine. */
  machinesDhuSerialNumberChanged: Machine;
  /** Subscription for HPS changes on any machine. */
  machinesHpsSet: Machine;
  /** Subscription for machine metrics changes on any machine. */
  machinesMetricsChanged: Machine;
  /** Subscription for TCS package version changes on any machine. */
  machinesTcsPackageVersionChanged: Machine;
};


export type SubscriptionMachineDhuFirmwareNumberChangedArgs = {
  machineId: Scalars['UUID']['input'];
};


export type SubscriptionMachineDhuIsCommunicationChangedArgs = {
  machineId: Scalars['UUID']['input'];
};


export type SubscriptionMachineDhuSerialNumberChangedArgs = {
  machineId: Scalars['UUID']['input'];
};


export type SubscriptionMachineHpsSetArgs = {
  machineId: Scalars['UUID']['input'];
};


export type SubscriptionMachineMetricsChangedArgs = {
  machineId: Scalars['UUID']['input'];
};


export type SubscriptionMachineTcsPackageVersionChangedArgs = {
  machineId: Scalars['UUID']['input'];
};

export enum TypeOfOwnership {
  CustomerOwned = 'CUSTOMER_OWNED',
  Demo = 'DEMO',
  LongTermRental = 'LONG_TERM_RENTAL',
  Others = 'OTHERS',
  ShortTermRental = 'SHORT_TERM_RENTAL'
}

export type UpdateCustomerError = AssetNotFoundError | NotAllowedError | ValidationError;

export type UpdateCustomerInput = {
  customer: CustomerUpdateInput;
};

export type UpdateCustomerPayload = {
  __typename?: 'UpdateCustomerPayload';
  customer?: Maybe<Customer>;
  errors?: Maybe<Array<UpdateCustomerError>>;
};

export type UpdateCustomersError = AssetNotFoundError | NotAllowedError | ValidationError;

export type UpdateCustomersInput = {
  customers: Array<CustomerUpdateInput>;
};

export type UpdateCustomersPayload = {
  __typename?: 'UpdateCustomersPayload';
  customers?: Maybe<Array<Customer>>;
  errors?: Maybe<Array<UpdateCustomersError>>;
};

export type UpdateDepartmentError = AssetNotFoundError | NotAllowedError | ValidationError;

export type UpdateDepartmentInput = {
  department: DepartmentUpdateInput;
};

export type UpdateDepartmentPayload = {
  __typename?: 'UpdateDepartmentPayload';
  department?: Maybe<Department>;
  errors?: Maybe<Array<UpdateDepartmentError>>;
};

export type UpdateDepartmentsError = AssetNotFoundError | NotAllowedError | ValidationError;

export type UpdateDepartmentsInput = {
  departmentUpdates: Array<DepartmentUpdateInput>;
};

export type UpdateDepartmentsPayload = {
  __typename?: 'UpdateDepartmentsPayload';
  departments?: Maybe<Array<Department>>;
  errors?: Maybe<Array<UpdateDepartmentsError>>;
};

export type UpdateErpIdError = AssetNotFoundError | NotAllowedError;

export type UpdateErpIdInput = {
  erpId: Scalars['String']['input'];
  machineId: Scalars['ID']['input'];
};

export type UpdateErpIdPayload = {
  __typename?: 'UpdateErpIdPayload';
  errors?: Maybe<Array<UpdateErpIdError>>;
  machine?: Maybe<Machine>;
};

export type UpdateMachineError = AssetNotFoundError | NotAllowedError;

export type UpdateMachineInput = {
  machineUpdate: MachineUpdateInput;
};

export type UpdateMachinePayload = {
  __typename?: 'UpdateMachinePayload';
  errors?: Maybe<Array<UpdateMachineError>>;
  machine?: Maybe<Machine>;
};

export type UpdateMachinesInput = {
  machineUpdates: Array<MachineUpdateInput>;
};

export type UpdateMachinesPayload = {
  __typename?: 'UpdateMachinesPayload';
  machinesUpdateErrors: Array<MachineUpdateError>;
  updatedMachines: Array<Machine>;
};

export type UpdateSiteError = AssetNotFoundError | NotAllowedError | ValidationError;

export type UpdateSiteInput = {
  site: SiteUpdateInput;
};

export type UpdateSitePayload = {
  __typename?: 'UpdateSitePayload';
  errors?: Maybe<Array<UpdateSiteError>>;
  site?: Maybe<Site>;
};

export type UpdateSitesError = AssetNotFoundError | NotAllowedError | ValidationError;

export type UpdateSitesInput = {
  sites: Array<SiteUpdateInput>;
};

export type UpdateSitesPayload = {
  __typename?: 'UpdateSitesPayload';
  errors?: Maybe<Array<UpdateSitesError>>;
  sites?: Maybe<Array<Site>>;
};

export type UuidOperationFilterInput = {
  eq?: InputMaybe<Scalars['UUID']['input']>;
  gt?: InputMaybe<Scalars['UUID']['input']>;
  gte?: InputMaybe<Scalars['UUID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['UUID']['input']>>>;
  lt?: InputMaybe<Scalars['UUID']['input']>;
  lte?: InputMaybe<Scalars['UUID']['input']>;
  neq?: InputMaybe<Scalars['UUID']['input']>;
  ngt?: InputMaybe<Scalars['UUID']['input']>;
  ngte?: InputMaybe<Scalars['UUID']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['UUID']['input']>>>;
  nlt?: InputMaybe<Scalars['UUID']['input']>;
  nlte?: InputMaybe<Scalars['UUID']['input']>;
};

export type ValidationError = Error & {
  __typename?: 'ValidationError';
  message: Scalars['String']['output'];
};
