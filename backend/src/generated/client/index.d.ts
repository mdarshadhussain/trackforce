
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Employee
 * 
 */
export type Employee = $Result.DefaultSelection<Prisma.$EmployeePayload>
/**
 * Model Site
 * 
 */
export type Site = $Result.DefaultSelection<Prisma.$SitePayload>
/**
 * Model Attendance
 * 
 */
export type Attendance = $Result.DefaultSelection<Prisma.$AttendancePayload>
/**
 * Model Break
 * 
 */
export type Break = $Result.DefaultSelection<Prisma.$BreakPayload>
/**
 * Model Tracking
 * 
 */
export type Tracking = $Result.DefaultSelection<Prisma.$TrackingPayload>
/**
 * Model SecurityAlert
 * 
 */
export type SecurityAlert = $Result.DefaultSelection<Prisma.$SecurityAlertPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Employees
 * const employees = await prisma.employee.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Employees
   * const employees = await prisma.employee.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.employee`: Exposes CRUD operations for the **Employee** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Employees
    * const employees = await prisma.employee.findMany()
    * ```
    */
  get employee(): Prisma.EmployeeDelegate<ExtArgs>;

  /**
   * `prisma.site`: Exposes CRUD operations for the **Site** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sites
    * const sites = await prisma.site.findMany()
    * ```
    */
  get site(): Prisma.SiteDelegate<ExtArgs>;

  /**
   * `prisma.attendance`: Exposes CRUD operations for the **Attendance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Attendances
    * const attendances = await prisma.attendance.findMany()
    * ```
    */
  get attendance(): Prisma.AttendanceDelegate<ExtArgs>;

  /**
   * `prisma.break`: Exposes CRUD operations for the **Break** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Breaks
    * const breaks = await prisma.break.findMany()
    * ```
    */
  get break(): Prisma.BreakDelegate<ExtArgs>;

  /**
   * `prisma.tracking`: Exposes CRUD operations for the **Tracking** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Trackings
    * const trackings = await prisma.tracking.findMany()
    * ```
    */
  get tracking(): Prisma.TrackingDelegate<ExtArgs>;

  /**
   * `prisma.securityAlert`: Exposes CRUD operations for the **SecurityAlert** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SecurityAlerts
    * const securityAlerts = await prisma.securityAlert.findMany()
    * ```
    */
  get securityAlert(): Prisma.SecurityAlertDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Employee: 'Employee',
    Site: 'Site',
    Attendance: 'Attendance',
    Break: 'Break',
    Tracking: 'Tracking',
    SecurityAlert: 'SecurityAlert'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "employee" | "site" | "attendance" | "break" | "tracking" | "securityAlert"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Employee: {
        payload: Prisma.$EmployeePayload<ExtArgs>
        fields: Prisma.EmployeeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmployeeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmployeeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          findFirst: {
            args: Prisma.EmployeeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmployeeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          findMany: {
            args: Prisma.EmployeeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>[]
          }
          create: {
            args: Prisma.EmployeeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          createMany: {
            args: Prisma.EmployeeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmployeeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>[]
          }
          delete: {
            args: Prisma.EmployeeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          update: {
            args: Prisma.EmployeeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          deleteMany: {
            args: Prisma.EmployeeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmployeeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EmployeeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          aggregate: {
            args: Prisma.EmployeeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmployee>
          }
          groupBy: {
            args: Prisma.EmployeeGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmployeeGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmployeeCountArgs<ExtArgs>
            result: $Utils.Optional<EmployeeCountAggregateOutputType> | number
          }
        }
      }
      Site: {
        payload: Prisma.$SitePayload<ExtArgs>
        fields: Prisma.SiteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SiteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SitePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SiteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SitePayload>
          }
          findFirst: {
            args: Prisma.SiteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SitePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SiteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SitePayload>
          }
          findMany: {
            args: Prisma.SiteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SitePayload>[]
          }
          create: {
            args: Prisma.SiteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SitePayload>
          }
          createMany: {
            args: Prisma.SiteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SiteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SitePayload>[]
          }
          delete: {
            args: Prisma.SiteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SitePayload>
          }
          update: {
            args: Prisma.SiteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SitePayload>
          }
          deleteMany: {
            args: Prisma.SiteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SiteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SiteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SitePayload>
          }
          aggregate: {
            args: Prisma.SiteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSite>
          }
          groupBy: {
            args: Prisma.SiteGroupByArgs<ExtArgs>
            result: $Utils.Optional<SiteGroupByOutputType>[]
          }
          count: {
            args: Prisma.SiteCountArgs<ExtArgs>
            result: $Utils.Optional<SiteCountAggregateOutputType> | number
          }
        }
      }
      Attendance: {
        payload: Prisma.$AttendancePayload<ExtArgs>
        fields: Prisma.AttendanceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AttendanceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AttendanceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          findFirst: {
            args: Prisma.AttendanceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AttendanceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          findMany: {
            args: Prisma.AttendanceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>[]
          }
          create: {
            args: Prisma.AttendanceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          createMany: {
            args: Prisma.AttendanceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AttendanceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>[]
          }
          delete: {
            args: Prisma.AttendanceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          update: {
            args: Prisma.AttendanceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          deleteMany: {
            args: Prisma.AttendanceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AttendanceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AttendanceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          aggregate: {
            args: Prisma.AttendanceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAttendance>
          }
          groupBy: {
            args: Prisma.AttendanceGroupByArgs<ExtArgs>
            result: $Utils.Optional<AttendanceGroupByOutputType>[]
          }
          count: {
            args: Prisma.AttendanceCountArgs<ExtArgs>
            result: $Utils.Optional<AttendanceCountAggregateOutputType> | number
          }
        }
      }
      Break: {
        payload: Prisma.$BreakPayload<ExtArgs>
        fields: Prisma.BreakFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BreakFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BreakPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BreakFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BreakPayload>
          }
          findFirst: {
            args: Prisma.BreakFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BreakPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BreakFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BreakPayload>
          }
          findMany: {
            args: Prisma.BreakFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BreakPayload>[]
          }
          create: {
            args: Prisma.BreakCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BreakPayload>
          }
          createMany: {
            args: Prisma.BreakCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BreakCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BreakPayload>[]
          }
          delete: {
            args: Prisma.BreakDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BreakPayload>
          }
          update: {
            args: Prisma.BreakUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BreakPayload>
          }
          deleteMany: {
            args: Prisma.BreakDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BreakUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BreakUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BreakPayload>
          }
          aggregate: {
            args: Prisma.BreakAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBreak>
          }
          groupBy: {
            args: Prisma.BreakGroupByArgs<ExtArgs>
            result: $Utils.Optional<BreakGroupByOutputType>[]
          }
          count: {
            args: Prisma.BreakCountArgs<ExtArgs>
            result: $Utils.Optional<BreakCountAggregateOutputType> | number
          }
        }
      }
      Tracking: {
        payload: Prisma.$TrackingPayload<ExtArgs>
        fields: Prisma.TrackingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TrackingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TrackingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingPayload>
          }
          findFirst: {
            args: Prisma.TrackingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TrackingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingPayload>
          }
          findMany: {
            args: Prisma.TrackingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingPayload>[]
          }
          create: {
            args: Prisma.TrackingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingPayload>
          }
          createMany: {
            args: Prisma.TrackingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TrackingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingPayload>[]
          }
          delete: {
            args: Prisma.TrackingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingPayload>
          }
          update: {
            args: Prisma.TrackingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingPayload>
          }
          deleteMany: {
            args: Prisma.TrackingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TrackingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TrackingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingPayload>
          }
          aggregate: {
            args: Prisma.TrackingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTracking>
          }
          groupBy: {
            args: Prisma.TrackingGroupByArgs<ExtArgs>
            result: $Utils.Optional<TrackingGroupByOutputType>[]
          }
          count: {
            args: Prisma.TrackingCountArgs<ExtArgs>
            result: $Utils.Optional<TrackingCountAggregateOutputType> | number
          }
        }
      }
      SecurityAlert: {
        payload: Prisma.$SecurityAlertPayload<ExtArgs>
        fields: Prisma.SecurityAlertFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SecurityAlertFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityAlertPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SecurityAlertFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityAlertPayload>
          }
          findFirst: {
            args: Prisma.SecurityAlertFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityAlertPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SecurityAlertFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityAlertPayload>
          }
          findMany: {
            args: Prisma.SecurityAlertFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityAlertPayload>[]
          }
          create: {
            args: Prisma.SecurityAlertCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityAlertPayload>
          }
          createMany: {
            args: Prisma.SecurityAlertCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SecurityAlertCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityAlertPayload>[]
          }
          delete: {
            args: Prisma.SecurityAlertDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityAlertPayload>
          }
          update: {
            args: Prisma.SecurityAlertUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityAlertPayload>
          }
          deleteMany: {
            args: Prisma.SecurityAlertDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SecurityAlertUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SecurityAlertUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SecurityAlertPayload>
          }
          aggregate: {
            args: Prisma.SecurityAlertAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSecurityAlert>
          }
          groupBy: {
            args: Prisma.SecurityAlertGroupByArgs<ExtArgs>
            result: $Utils.Optional<SecurityAlertGroupByOutputType>[]
          }
          count: {
            args: Prisma.SecurityAlertCountArgs<ExtArgs>
            result: $Utils.Optional<SecurityAlertCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type EmployeeCountOutputType
   */

  export type EmployeeCountOutputType = {
    attendance: number
    tracking: number
  }

  export type EmployeeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attendance?: boolean | EmployeeCountOutputTypeCountAttendanceArgs
    tracking?: boolean | EmployeeCountOutputTypeCountTrackingArgs
  }

  // Custom InputTypes
  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployeeCountOutputType
     */
    select?: EmployeeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeCountAttendanceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttendanceWhereInput
  }

  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeCountTrackingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrackingWhereInput
  }


  /**
   * Count Type SiteCountOutputType
   */

  export type SiteCountOutputType = {
    employees: number
  }

  export type SiteCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employees?: boolean | SiteCountOutputTypeCountEmployeesArgs
  }

  // Custom InputTypes
  /**
   * SiteCountOutputType without action
   */
  export type SiteCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteCountOutputType
     */
    select?: SiteCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SiteCountOutputType without action
   */
  export type SiteCountOutputTypeCountEmployeesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeWhereInput
  }


  /**
   * Count Type AttendanceCountOutputType
   */

  export type AttendanceCountOutputType = {
    breaks: number
  }

  export type AttendanceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    breaks?: boolean | AttendanceCountOutputTypeCountBreaksArgs
  }

  // Custom InputTypes
  /**
   * AttendanceCountOutputType without action
   */
  export type AttendanceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttendanceCountOutputType
     */
    select?: AttendanceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AttendanceCountOutputType without action
   */
  export type AttendanceCountOutputTypeCountBreaksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BreakWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Employee
   */

  export type AggregateEmployee = {
    _count: EmployeeCountAggregateOutputType | null
    _min: EmployeeMinAggregateOutputType | null
    _max: EmployeeMaxAggregateOutputType | null
  }

  export type EmployeeMinAggregateOutputType = {
    id: string | null
    employeeId: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    password: string | null
    role: string | null
    phone: string | null
    designation: string | null
    status: string | null
    avatar: string | null
    siteId: string | null
    isBiometricEnrolled: boolean | null
    biometricToken: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmployeeMaxAggregateOutputType = {
    id: string | null
    employeeId: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    password: string | null
    role: string | null
    phone: string | null
    designation: string | null
    status: string | null
    avatar: string | null
    siteId: string | null
    isBiometricEnrolled: boolean | null
    biometricToken: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmployeeCountAggregateOutputType = {
    id: number
    employeeId: number
    firstName: number
    lastName: number
    email: number
    password: number
    role: number
    phone: number
    designation: number
    status: number
    avatar: number
    siteId: number
    isBiometricEnrolled: number
    biometricToken: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EmployeeMinAggregateInputType = {
    id?: true
    employeeId?: true
    firstName?: true
    lastName?: true
    email?: true
    password?: true
    role?: true
    phone?: true
    designation?: true
    status?: true
    avatar?: true
    siteId?: true
    isBiometricEnrolled?: true
    biometricToken?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmployeeMaxAggregateInputType = {
    id?: true
    employeeId?: true
    firstName?: true
    lastName?: true
    email?: true
    password?: true
    role?: true
    phone?: true
    designation?: true
    status?: true
    avatar?: true
    siteId?: true
    isBiometricEnrolled?: true
    biometricToken?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmployeeCountAggregateInputType = {
    id?: true
    employeeId?: true
    firstName?: true
    lastName?: true
    email?: true
    password?: true
    role?: true
    phone?: true
    designation?: true
    status?: true
    avatar?: true
    siteId?: true
    isBiometricEnrolled?: true
    biometricToken?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EmployeeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Employee to aggregate.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Employees
    **/
    _count?: true | EmployeeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmployeeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmployeeMaxAggregateInputType
  }

  export type GetEmployeeAggregateType<T extends EmployeeAggregateArgs> = {
        [P in keyof T & keyof AggregateEmployee]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmployee[P]>
      : GetScalarType<T[P], AggregateEmployee[P]>
  }




  export type EmployeeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeWhereInput
    orderBy?: EmployeeOrderByWithAggregationInput | EmployeeOrderByWithAggregationInput[]
    by: EmployeeScalarFieldEnum[] | EmployeeScalarFieldEnum
    having?: EmployeeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmployeeCountAggregateInputType | true
    _min?: EmployeeMinAggregateInputType
    _max?: EmployeeMaxAggregateInputType
  }

  export type EmployeeGroupByOutputType = {
    id: string
    employeeId: string
    firstName: string
    lastName: string
    email: string
    password: string
    role: string
    phone: string | null
    designation: string | null
    status: string
    avatar: string | null
    siteId: string | null
    isBiometricEnrolled: boolean
    biometricToken: string | null
    createdAt: Date
    updatedAt: Date
    _count: EmployeeCountAggregateOutputType | null
    _min: EmployeeMinAggregateOutputType | null
    _max: EmployeeMaxAggregateOutputType | null
  }

  type GetEmployeeGroupByPayload<T extends EmployeeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmployeeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmployeeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmployeeGroupByOutputType[P]>
            : GetScalarType<T[P], EmployeeGroupByOutputType[P]>
        }
      >
    >


  export type EmployeeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    phone?: boolean
    designation?: boolean
    status?: boolean
    avatar?: boolean
    siteId?: boolean
    isBiometricEnrolled?: boolean
    biometricToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    site?: boolean | Employee$siteArgs<ExtArgs>
    attendance?: boolean | Employee$attendanceArgs<ExtArgs>
    tracking?: boolean | Employee$trackingArgs<ExtArgs>
    _count?: boolean | EmployeeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employee"]>

  export type EmployeeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    phone?: boolean
    designation?: boolean
    status?: boolean
    avatar?: boolean
    siteId?: boolean
    isBiometricEnrolled?: boolean
    biometricToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    site?: boolean | Employee$siteArgs<ExtArgs>
  }, ExtArgs["result"]["employee"]>

  export type EmployeeSelectScalar = {
    id?: boolean
    employeeId?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    phone?: boolean
    designation?: boolean
    status?: boolean
    avatar?: boolean
    siteId?: boolean
    isBiometricEnrolled?: boolean
    biometricToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EmployeeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    site?: boolean | Employee$siteArgs<ExtArgs>
    attendance?: boolean | Employee$attendanceArgs<ExtArgs>
    tracking?: boolean | Employee$trackingArgs<ExtArgs>
    _count?: boolean | EmployeeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EmployeeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    site?: boolean | Employee$siteArgs<ExtArgs>
  }

  export type $EmployeePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Employee"
    objects: {
      site: Prisma.$SitePayload<ExtArgs> | null
      attendance: Prisma.$AttendancePayload<ExtArgs>[]
      tracking: Prisma.$TrackingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employeeId: string
      firstName: string
      lastName: string
      email: string
      password: string
      role: string
      phone: string | null
      designation: string | null
      status: string
      avatar: string | null
      siteId: string | null
      isBiometricEnrolled: boolean
      biometricToken: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["employee"]>
    composites: {}
  }

  type EmployeeGetPayload<S extends boolean | null | undefined | EmployeeDefaultArgs> = $Result.GetResult<Prisma.$EmployeePayload, S>

  type EmployeeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<EmployeeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: EmployeeCountAggregateInputType | true
    }

  export interface EmployeeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Employee'], meta: { name: 'Employee' } }
    /**
     * Find zero or one Employee that matches the filter.
     * @param {EmployeeFindUniqueArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmployeeFindUniqueArgs>(args: SelectSubset<T, EmployeeFindUniqueArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Employee that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {EmployeeFindUniqueOrThrowArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmployeeFindUniqueOrThrowArgs>(args: SelectSubset<T, EmployeeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Employee that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindFirstArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmployeeFindFirstArgs>(args?: SelectSubset<T, EmployeeFindFirstArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Employee that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindFirstOrThrowArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmployeeFindFirstOrThrowArgs>(args?: SelectSubset<T, EmployeeFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Employees that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Employees
     * const employees = await prisma.employee.findMany()
     * 
     * // Get first 10 Employees
     * const employees = await prisma.employee.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const employeeWithIdOnly = await prisma.employee.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmployeeFindManyArgs>(args?: SelectSubset<T, EmployeeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Employee.
     * @param {EmployeeCreateArgs} args - Arguments to create a Employee.
     * @example
     * // Create one Employee
     * const Employee = await prisma.employee.create({
     *   data: {
     *     // ... data to create a Employee
     *   }
     * })
     * 
     */
    create<T extends EmployeeCreateArgs>(args: SelectSubset<T, EmployeeCreateArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Employees.
     * @param {EmployeeCreateManyArgs} args - Arguments to create many Employees.
     * @example
     * // Create many Employees
     * const employee = await prisma.employee.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmployeeCreateManyArgs>(args?: SelectSubset<T, EmployeeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Employees and returns the data saved in the database.
     * @param {EmployeeCreateManyAndReturnArgs} args - Arguments to create many Employees.
     * @example
     * // Create many Employees
     * const employee = await prisma.employee.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Employees and only return the `id`
     * const employeeWithIdOnly = await prisma.employee.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmployeeCreateManyAndReturnArgs>(args?: SelectSubset<T, EmployeeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Employee.
     * @param {EmployeeDeleteArgs} args - Arguments to delete one Employee.
     * @example
     * // Delete one Employee
     * const Employee = await prisma.employee.delete({
     *   where: {
     *     // ... filter to delete one Employee
     *   }
     * })
     * 
     */
    delete<T extends EmployeeDeleteArgs>(args: SelectSubset<T, EmployeeDeleteArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Employee.
     * @param {EmployeeUpdateArgs} args - Arguments to update one Employee.
     * @example
     * // Update one Employee
     * const employee = await prisma.employee.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmployeeUpdateArgs>(args: SelectSubset<T, EmployeeUpdateArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Employees.
     * @param {EmployeeDeleteManyArgs} args - Arguments to filter Employees to delete.
     * @example
     * // Delete a few Employees
     * const { count } = await prisma.employee.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmployeeDeleteManyArgs>(args?: SelectSubset<T, EmployeeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Employees
     * const employee = await prisma.employee.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmployeeUpdateManyArgs>(args: SelectSubset<T, EmployeeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Employee.
     * @param {EmployeeUpsertArgs} args - Arguments to update or create a Employee.
     * @example
     * // Update or create a Employee
     * const employee = await prisma.employee.upsert({
     *   create: {
     *     // ... data to create a Employee
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Employee we want to update
     *   }
     * })
     */
    upsert<T extends EmployeeUpsertArgs>(args: SelectSubset<T, EmployeeUpsertArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeCountArgs} args - Arguments to filter Employees to count.
     * @example
     * // Count the number of Employees
     * const count = await prisma.employee.count({
     *   where: {
     *     // ... the filter for the Employees we want to count
     *   }
     * })
    **/
    count<T extends EmployeeCountArgs>(
      args?: Subset<T, EmployeeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmployeeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Employee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmployeeAggregateArgs>(args: Subset<T, EmployeeAggregateArgs>): Prisma.PrismaPromise<GetEmployeeAggregateType<T>>

    /**
     * Group by Employee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmployeeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmployeeGroupByArgs['orderBy'] }
        : { orderBy?: EmployeeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmployeeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmployeeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Employee model
   */
  readonly fields: EmployeeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Employee.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmployeeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    site<T extends Employee$siteArgs<ExtArgs> = {}>(args?: Subset<T, Employee$siteArgs<ExtArgs>>): Prisma__SiteClient<$Result.GetResult<Prisma.$SitePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    attendance<T extends Employee$attendanceArgs<ExtArgs> = {}>(args?: Subset<T, Employee$attendanceArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findMany"> | Null>
    tracking<T extends Employee$trackingArgs<ExtArgs> = {}>(args?: Subset<T, Employee$trackingArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrackingPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Employee model
   */ 
  interface EmployeeFieldRefs {
    readonly id: FieldRef<"Employee", 'String'>
    readonly employeeId: FieldRef<"Employee", 'String'>
    readonly firstName: FieldRef<"Employee", 'String'>
    readonly lastName: FieldRef<"Employee", 'String'>
    readonly email: FieldRef<"Employee", 'String'>
    readonly password: FieldRef<"Employee", 'String'>
    readonly role: FieldRef<"Employee", 'String'>
    readonly phone: FieldRef<"Employee", 'String'>
    readonly designation: FieldRef<"Employee", 'String'>
    readonly status: FieldRef<"Employee", 'String'>
    readonly avatar: FieldRef<"Employee", 'String'>
    readonly siteId: FieldRef<"Employee", 'String'>
    readonly isBiometricEnrolled: FieldRef<"Employee", 'Boolean'>
    readonly biometricToken: FieldRef<"Employee", 'String'>
    readonly createdAt: FieldRef<"Employee", 'DateTime'>
    readonly updatedAt: FieldRef<"Employee", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Employee findUnique
   */
  export type EmployeeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee findUniqueOrThrow
   */
  export type EmployeeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee findFirst
   */
  export type EmployeeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Employees.
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Employees.
     */
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Employee findFirstOrThrow
   */
  export type EmployeeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Employees.
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Employees.
     */
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Employee findMany
   */
  export type EmployeeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employees to fetch.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Employees.
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Employee create
   */
  export type EmployeeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * The data needed to create a Employee.
     */
    data: XOR<EmployeeCreateInput, EmployeeUncheckedCreateInput>
  }

  /**
   * Employee createMany
   */
  export type EmployeeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Employees.
     */
    data: EmployeeCreateManyInput | EmployeeCreateManyInput[]
  }

  /**
   * Employee createManyAndReturn
   */
  export type EmployeeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Employees.
     */
    data: EmployeeCreateManyInput | EmployeeCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Employee update
   */
  export type EmployeeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * The data needed to update a Employee.
     */
    data: XOR<EmployeeUpdateInput, EmployeeUncheckedUpdateInput>
    /**
     * Choose, which Employee to update.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee updateMany
   */
  export type EmployeeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Employees.
     */
    data: XOR<EmployeeUpdateManyMutationInput, EmployeeUncheckedUpdateManyInput>
    /**
     * Filter which Employees to update
     */
    where?: EmployeeWhereInput
  }

  /**
   * Employee upsert
   */
  export type EmployeeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * The filter to search for the Employee to update in case it exists.
     */
    where: EmployeeWhereUniqueInput
    /**
     * In case the Employee found by the `where` argument doesn't exist, create a new Employee with this data.
     */
    create: XOR<EmployeeCreateInput, EmployeeUncheckedCreateInput>
    /**
     * In case the Employee was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmployeeUpdateInput, EmployeeUncheckedUpdateInput>
  }

  /**
   * Employee delete
   */
  export type EmployeeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter which Employee to delete.
     */
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee deleteMany
   */
  export type EmployeeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Employees to delete
     */
    where?: EmployeeWhereInput
  }

  /**
   * Employee.site
   */
  export type Employee$siteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Site
     */
    select?: SiteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteInclude<ExtArgs> | null
    where?: SiteWhereInput
  }

  /**
   * Employee.attendance
   */
  export type Employee$attendanceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    where?: AttendanceWhereInput
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    cursor?: AttendanceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AttendanceScalarFieldEnum | AttendanceScalarFieldEnum[]
  }

  /**
   * Employee.tracking
   */
  export type Employee$trackingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tracking
     */
    select?: TrackingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingInclude<ExtArgs> | null
    where?: TrackingWhereInput
    orderBy?: TrackingOrderByWithRelationInput | TrackingOrderByWithRelationInput[]
    cursor?: TrackingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TrackingScalarFieldEnum | TrackingScalarFieldEnum[]
  }

  /**
   * Employee without action
   */
  export type EmployeeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
  }


  /**
   * Model Site
   */

  export type AggregateSite = {
    _count: SiteCountAggregateOutputType | null
    _avg: SiteAvgAggregateOutputType | null
    _sum: SiteSumAggregateOutputType | null
    _min: SiteMinAggregateOutputType | null
    _max: SiteMaxAggregateOutputType | null
  }

  export type SiteAvgAggregateOutputType = {
    latitude: number | null
    longitude: number | null
  }

  export type SiteSumAggregateOutputType = {
    latitude: number | null
    longitude: number | null
  }

  export type SiteMinAggregateOutputType = {
    id: string | null
    name: string | null
    location: string | null
    latitude: number | null
    longitude: number | null
    managerName: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SiteMaxAggregateOutputType = {
    id: string | null
    name: string | null
    location: string | null
    latitude: number | null
    longitude: number | null
    managerName: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SiteCountAggregateOutputType = {
    id: number
    name: number
    location: number
    latitude: number
    longitude: number
    managerName: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SiteAvgAggregateInputType = {
    latitude?: true
    longitude?: true
  }

  export type SiteSumAggregateInputType = {
    latitude?: true
    longitude?: true
  }

  export type SiteMinAggregateInputType = {
    id?: true
    name?: true
    location?: true
    latitude?: true
    longitude?: true
    managerName?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SiteMaxAggregateInputType = {
    id?: true
    name?: true
    location?: true
    latitude?: true
    longitude?: true
    managerName?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SiteCountAggregateInputType = {
    id?: true
    name?: true
    location?: true
    latitude?: true
    longitude?: true
    managerName?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SiteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Site to aggregate.
     */
    where?: SiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sites to fetch.
     */
    orderBy?: SiteOrderByWithRelationInput | SiteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sites
    **/
    _count?: true | SiteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SiteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SiteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SiteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SiteMaxAggregateInputType
  }

  export type GetSiteAggregateType<T extends SiteAggregateArgs> = {
        [P in keyof T & keyof AggregateSite]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSite[P]>
      : GetScalarType<T[P], AggregateSite[P]>
  }




  export type SiteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SiteWhereInput
    orderBy?: SiteOrderByWithAggregationInput | SiteOrderByWithAggregationInput[]
    by: SiteScalarFieldEnum[] | SiteScalarFieldEnum
    having?: SiteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SiteCountAggregateInputType | true
    _avg?: SiteAvgAggregateInputType
    _sum?: SiteSumAggregateInputType
    _min?: SiteMinAggregateInputType
    _max?: SiteMaxAggregateInputType
  }

  export type SiteGroupByOutputType = {
    id: string
    name: string
    location: string
    latitude: number | null
    longitude: number | null
    managerName: string | null
    createdAt: Date
    updatedAt: Date
    _count: SiteCountAggregateOutputType | null
    _avg: SiteAvgAggregateOutputType | null
    _sum: SiteSumAggregateOutputType | null
    _min: SiteMinAggregateOutputType | null
    _max: SiteMaxAggregateOutputType | null
  }

  type GetSiteGroupByPayload<T extends SiteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SiteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SiteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SiteGroupByOutputType[P]>
            : GetScalarType<T[P], SiteGroupByOutputType[P]>
        }
      >
    >


  export type SiteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    location?: boolean
    latitude?: boolean
    longitude?: boolean
    managerName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    employees?: boolean | Site$employeesArgs<ExtArgs>
    _count?: boolean | SiteCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["site"]>

  export type SiteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    location?: boolean
    latitude?: boolean
    longitude?: boolean
    managerName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["site"]>

  export type SiteSelectScalar = {
    id?: boolean
    name?: boolean
    location?: boolean
    latitude?: boolean
    longitude?: boolean
    managerName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SiteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employees?: boolean | Site$employeesArgs<ExtArgs>
    _count?: boolean | SiteCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SiteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SitePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Site"
    objects: {
      employees: Prisma.$EmployeePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      location: string
      latitude: number | null
      longitude: number | null
      managerName: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["site"]>
    composites: {}
  }

  type SiteGetPayload<S extends boolean | null | undefined | SiteDefaultArgs> = $Result.GetResult<Prisma.$SitePayload, S>

  type SiteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SiteFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SiteCountAggregateInputType | true
    }

  export interface SiteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Site'], meta: { name: 'Site' } }
    /**
     * Find zero or one Site that matches the filter.
     * @param {SiteFindUniqueArgs} args - Arguments to find a Site
     * @example
     * // Get one Site
     * const site = await prisma.site.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SiteFindUniqueArgs>(args: SelectSubset<T, SiteFindUniqueArgs<ExtArgs>>): Prisma__SiteClient<$Result.GetResult<Prisma.$SitePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Site that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SiteFindUniqueOrThrowArgs} args - Arguments to find a Site
     * @example
     * // Get one Site
     * const site = await prisma.site.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SiteFindUniqueOrThrowArgs>(args: SelectSubset<T, SiteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SiteClient<$Result.GetResult<Prisma.$SitePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Site that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteFindFirstArgs} args - Arguments to find a Site
     * @example
     * // Get one Site
     * const site = await prisma.site.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SiteFindFirstArgs>(args?: SelectSubset<T, SiteFindFirstArgs<ExtArgs>>): Prisma__SiteClient<$Result.GetResult<Prisma.$SitePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Site that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteFindFirstOrThrowArgs} args - Arguments to find a Site
     * @example
     * // Get one Site
     * const site = await prisma.site.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SiteFindFirstOrThrowArgs>(args?: SelectSubset<T, SiteFindFirstOrThrowArgs<ExtArgs>>): Prisma__SiteClient<$Result.GetResult<Prisma.$SitePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Sites that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sites
     * const sites = await prisma.site.findMany()
     * 
     * // Get first 10 Sites
     * const sites = await prisma.site.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const siteWithIdOnly = await prisma.site.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SiteFindManyArgs>(args?: SelectSubset<T, SiteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SitePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Site.
     * @param {SiteCreateArgs} args - Arguments to create a Site.
     * @example
     * // Create one Site
     * const Site = await prisma.site.create({
     *   data: {
     *     // ... data to create a Site
     *   }
     * })
     * 
     */
    create<T extends SiteCreateArgs>(args: SelectSubset<T, SiteCreateArgs<ExtArgs>>): Prisma__SiteClient<$Result.GetResult<Prisma.$SitePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Sites.
     * @param {SiteCreateManyArgs} args - Arguments to create many Sites.
     * @example
     * // Create many Sites
     * const site = await prisma.site.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SiteCreateManyArgs>(args?: SelectSubset<T, SiteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sites and returns the data saved in the database.
     * @param {SiteCreateManyAndReturnArgs} args - Arguments to create many Sites.
     * @example
     * // Create many Sites
     * const site = await prisma.site.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sites and only return the `id`
     * const siteWithIdOnly = await prisma.site.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SiteCreateManyAndReturnArgs>(args?: SelectSubset<T, SiteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SitePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Site.
     * @param {SiteDeleteArgs} args - Arguments to delete one Site.
     * @example
     * // Delete one Site
     * const Site = await prisma.site.delete({
     *   where: {
     *     // ... filter to delete one Site
     *   }
     * })
     * 
     */
    delete<T extends SiteDeleteArgs>(args: SelectSubset<T, SiteDeleteArgs<ExtArgs>>): Prisma__SiteClient<$Result.GetResult<Prisma.$SitePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Site.
     * @param {SiteUpdateArgs} args - Arguments to update one Site.
     * @example
     * // Update one Site
     * const site = await prisma.site.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SiteUpdateArgs>(args: SelectSubset<T, SiteUpdateArgs<ExtArgs>>): Prisma__SiteClient<$Result.GetResult<Prisma.$SitePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Sites.
     * @param {SiteDeleteManyArgs} args - Arguments to filter Sites to delete.
     * @example
     * // Delete a few Sites
     * const { count } = await prisma.site.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SiteDeleteManyArgs>(args?: SelectSubset<T, SiteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sites
     * const site = await prisma.site.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SiteUpdateManyArgs>(args: SelectSubset<T, SiteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Site.
     * @param {SiteUpsertArgs} args - Arguments to update or create a Site.
     * @example
     * // Update or create a Site
     * const site = await prisma.site.upsert({
     *   create: {
     *     // ... data to create a Site
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Site we want to update
     *   }
     * })
     */
    upsert<T extends SiteUpsertArgs>(args: SelectSubset<T, SiteUpsertArgs<ExtArgs>>): Prisma__SiteClient<$Result.GetResult<Prisma.$SitePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Sites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteCountArgs} args - Arguments to filter Sites to count.
     * @example
     * // Count the number of Sites
     * const count = await prisma.site.count({
     *   where: {
     *     // ... the filter for the Sites we want to count
     *   }
     * })
    **/
    count<T extends SiteCountArgs>(
      args?: Subset<T, SiteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SiteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Site.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SiteAggregateArgs>(args: Subset<T, SiteAggregateArgs>): Prisma.PrismaPromise<GetSiteAggregateType<T>>

    /**
     * Group by Site.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SiteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SiteGroupByArgs['orderBy'] }
        : { orderBy?: SiteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SiteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSiteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Site model
   */
  readonly fields: SiteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Site.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SiteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employees<T extends Site$employeesArgs<ExtArgs> = {}>(args?: Subset<T, Site$employeesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Site model
   */ 
  interface SiteFieldRefs {
    readonly id: FieldRef<"Site", 'String'>
    readonly name: FieldRef<"Site", 'String'>
    readonly location: FieldRef<"Site", 'String'>
    readonly latitude: FieldRef<"Site", 'Float'>
    readonly longitude: FieldRef<"Site", 'Float'>
    readonly managerName: FieldRef<"Site", 'String'>
    readonly createdAt: FieldRef<"Site", 'DateTime'>
    readonly updatedAt: FieldRef<"Site", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Site findUnique
   */
  export type SiteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Site
     */
    select?: SiteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteInclude<ExtArgs> | null
    /**
     * Filter, which Site to fetch.
     */
    where: SiteWhereUniqueInput
  }

  /**
   * Site findUniqueOrThrow
   */
  export type SiteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Site
     */
    select?: SiteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteInclude<ExtArgs> | null
    /**
     * Filter, which Site to fetch.
     */
    where: SiteWhereUniqueInput
  }

  /**
   * Site findFirst
   */
  export type SiteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Site
     */
    select?: SiteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteInclude<ExtArgs> | null
    /**
     * Filter, which Site to fetch.
     */
    where?: SiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sites to fetch.
     */
    orderBy?: SiteOrderByWithRelationInput | SiteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sites.
     */
    cursor?: SiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sites.
     */
    distinct?: SiteScalarFieldEnum | SiteScalarFieldEnum[]
  }

  /**
   * Site findFirstOrThrow
   */
  export type SiteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Site
     */
    select?: SiteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteInclude<ExtArgs> | null
    /**
     * Filter, which Site to fetch.
     */
    where?: SiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sites to fetch.
     */
    orderBy?: SiteOrderByWithRelationInput | SiteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sites.
     */
    cursor?: SiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sites.
     */
    distinct?: SiteScalarFieldEnum | SiteScalarFieldEnum[]
  }

  /**
   * Site findMany
   */
  export type SiteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Site
     */
    select?: SiteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteInclude<ExtArgs> | null
    /**
     * Filter, which Sites to fetch.
     */
    where?: SiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sites to fetch.
     */
    orderBy?: SiteOrderByWithRelationInput | SiteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sites.
     */
    cursor?: SiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sites.
     */
    skip?: number
    distinct?: SiteScalarFieldEnum | SiteScalarFieldEnum[]
  }

  /**
   * Site create
   */
  export type SiteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Site
     */
    select?: SiteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteInclude<ExtArgs> | null
    /**
     * The data needed to create a Site.
     */
    data: XOR<SiteCreateInput, SiteUncheckedCreateInput>
  }

  /**
   * Site createMany
   */
  export type SiteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sites.
     */
    data: SiteCreateManyInput | SiteCreateManyInput[]
  }

  /**
   * Site createManyAndReturn
   */
  export type SiteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Site
     */
    select?: SiteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Sites.
     */
    data: SiteCreateManyInput | SiteCreateManyInput[]
  }

  /**
   * Site update
   */
  export type SiteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Site
     */
    select?: SiteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteInclude<ExtArgs> | null
    /**
     * The data needed to update a Site.
     */
    data: XOR<SiteUpdateInput, SiteUncheckedUpdateInput>
    /**
     * Choose, which Site to update.
     */
    where: SiteWhereUniqueInput
  }

  /**
   * Site updateMany
   */
  export type SiteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sites.
     */
    data: XOR<SiteUpdateManyMutationInput, SiteUncheckedUpdateManyInput>
    /**
     * Filter which Sites to update
     */
    where?: SiteWhereInput
  }

  /**
   * Site upsert
   */
  export type SiteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Site
     */
    select?: SiteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteInclude<ExtArgs> | null
    /**
     * The filter to search for the Site to update in case it exists.
     */
    where: SiteWhereUniqueInput
    /**
     * In case the Site found by the `where` argument doesn't exist, create a new Site with this data.
     */
    create: XOR<SiteCreateInput, SiteUncheckedCreateInput>
    /**
     * In case the Site was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SiteUpdateInput, SiteUncheckedUpdateInput>
  }

  /**
   * Site delete
   */
  export type SiteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Site
     */
    select?: SiteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteInclude<ExtArgs> | null
    /**
     * Filter which Site to delete.
     */
    where: SiteWhereUniqueInput
  }

  /**
   * Site deleteMany
   */
  export type SiteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sites to delete
     */
    where?: SiteWhereInput
  }

  /**
   * Site.employees
   */
  export type Site$employeesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployeeInclude<ExtArgs> | null
    where?: EmployeeWhereInput
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    cursor?: EmployeeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }

  /**
   * Site without action
   */
  export type SiteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Site
     */
    select?: SiteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteInclude<ExtArgs> | null
  }


  /**
   * Model Attendance
   */

  export type AggregateAttendance = {
    _count: AttendanceCountAggregateOutputType | null
    _avg: AttendanceAvgAggregateOutputType | null
    _sum: AttendanceSumAggregateOutputType | null
    _min: AttendanceMinAggregateOutputType | null
    _max: AttendanceMaxAggregateOutputType | null
  }

  export type AttendanceAvgAggregateOutputType = {
    clockInLat: number | null
    clockInLong: number | null
    clockOutLat: number | null
    clockOutLong: number | null
  }

  export type AttendanceSumAggregateOutputType = {
    clockInLat: number | null
    clockInLong: number | null
    clockOutLat: number | null
    clockOutLong: number | null
  }

  export type AttendanceMinAggregateOutputType = {
    id: string | null
    employeeId: string | null
    date: Date | null
    clockIn: Date | null
    clockOut: Date | null
    clockInLat: number | null
    clockInLong: number | null
    clockOutLat: number | null
    clockOutLong: number | null
    biometricProof: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AttendanceMaxAggregateOutputType = {
    id: string | null
    employeeId: string | null
    date: Date | null
    clockIn: Date | null
    clockOut: Date | null
    clockInLat: number | null
    clockInLong: number | null
    clockOutLat: number | null
    clockOutLong: number | null
    biometricProof: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AttendanceCountAggregateOutputType = {
    id: number
    employeeId: number
    date: number
    clockIn: number
    clockOut: number
    clockInLat: number
    clockInLong: number
    clockOutLat: number
    clockOutLong: number
    biometricProof: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AttendanceAvgAggregateInputType = {
    clockInLat?: true
    clockInLong?: true
    clockOutLat?: true
    clockOutLong?: true
  }

  export type AttendanceSumAggregateInputType = {
    clockInLat?: true
    clockInLong?: true
    clockOutLat?: true
    clockOutLong?: true
  }

  export type AttendanceMinAggregateInputType = {
    id?: true
    employeeId?: true
    date?: true
    clockIn?: true
    clockOut?: true
    clockInLat?: true
    clockInLong?: true
    clockOutLat?: true
    clockOutLong?: true
    biometricProof?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AttendanceMaxAggregateInputType = {
    id?: true
    employeeId?: true
    date?: true
    clockIn?: true
    clockOut?: true
    clockInLat?: true
    clockInLong?: true
    clockOutLat?: true
    clockOutLong?: true
    biometricProof?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AttendanceCountAggregateInputType = {
    id?: true
    employeeId?: true
    date?: true
    clockIn?: true
    clockOut?: true
    clockInLat?: true
    clockInLong?: true
    clockOutLat?: true
    clockOutLong?: true
    biometricProof?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AttendanceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Attendance to aggregate.
     */
    where?: AttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attendances to fetch.
     */
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Attendances
    **/
    _count?: true | AttendanceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AttendanceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AttendanceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AttendanceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AttendanceMaxAggregateInputType
  }

  export type GetAttendanceAggregateType<T extends AttendanceAggregateArgs> = {
        [P in keyof T & keyof AggregateAttendance]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAttendance[P]>
      : GetScalarType<T[P], AggregateAttendance[P]>
  }




  export type AttendanceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttendanceWhereInput
    orderBy?: AttendanceOrderByWithAggregationInput | AttendanceOrderByWithAggregationInput[]
    by: AttendanceScalarFieldEnum[] | AttendanceScalarFieldEnum
    having?: AttendanceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AttendanceCountAggregateInputType | true
    _avg?: AttendanceAvgAggregateInputType
    _sum?: AttendanceSumAggregateInputType
    _min?: AttendanceMinAggregateInputType
    _max?: AttendanceMaxAggregateInputType
  }

  export type AttendanceGroupByOutputType = {
    id: string
    employeeId: string
    date: Date
    clockIn: Date
    clockOut: Date | null
    clockInLat: number | null
    clockInLong: number | null
    clockOutLat: number | null
    clockOutLong: number | null
    biometricProof: string | null
    status: string
    createdAt: Date
    updatedAt: Date
    _count: AttendanceCountAggregateOutputType | null
    _avg: AttendanceAvgAggregateOutputType | null
    _sum: AttendanceSumAggregateOutputType | null
    _min: AttendanceMinAggregateOutputType | null
    _max: AttendanceMaxAggregateOutputType | null
  }

  type GetAttendanceGroupByPayload<T extends AttendanceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AttendanceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AttendanceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AttendanceGroupByOutputType[P]>
            : GetScalarType<T[P], AttendanceGroupByOutputType[P]>
        }
      >
    >


  export type AttendanceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    date?: boolean
    clockIn?: boolean
    clockOut?: boolean
    clockInLat?: boolean
    clockInLong?: boolean
    clockOutLat?: boolean
    clockOutLong?: boolean
    biometricProof?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
    breaks?: boolean | Attendance$breaksArgs<ExtArgs>
    _count?: boolean | AttendanceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attendance"]>

  export type AttendanceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    date?: boolean
    clockIn?: boolean
    clockOut?: boolean
    clockInLat?: boolean
    clockInLong?: boolean
    clockOutLat?: boolean
    clockOutLong?: boolean
    biometricProof?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attendance"]>

  export type AttendanceSelectScalar = {
    id?: boolean
    employeeId?: boolean
    date?: boolean
    clockIn?: boolean
    clockOut?: boolean
    clockInLat?: boolean
    clockInLong?: boolean
    clockOutLat?: boolean
    clockOutLong?: boolean
    biometricProof?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AttendanceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
    breaks?: boolean | Attendance$breaksArgs<ExtArgs>
    _count?: boolean | AttendanceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AttendanceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }

  export type $AttendancePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Attendance"
    objects: {
      employee: Prisma.$EmployeePayload<ExtArgs>
      breaks: Prisma.$BreakPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employeeId: string
      date: Date
      clockIn: Date
      clockOut: Date | null
      clockInLat: number | null
      clockInLong: number | null
      clockOutLat: number | null
      clockOutLong: number | null
      biometricProof: string | null
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["attendance"]>
    composites: {}
  }

  type AttendanceGetPayload<S extends boolean | null | undefined | AttendanceDefaultArgs> = $Result.GetResult<Prisma.$AttendancePayload, S>

  type AttendanceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AttendanceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AttendanceCountAggregateInputType | true
    }

  export interface AttendanceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Attendance'], meta: { name: 'Attendance' } }
    /**
     * Find zero or one Attendance that matches the filter.
     * @param {AttendanceFindUniqueArgs} args - Arguments to find a Attendance
     * @example
     * // Get one Attendance
     * const attendance = await prisma.attendance.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AttendanceFindUniqueArgs>(args: SelectSubset<T, AttendanceFindUniqueArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Attendance that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AttendanceFindUniqueOrThrowArgs} args - Arguments to find a Attendance
     * @example
     * // Get one Attendance
     * const attendance = await prisma.attendance.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AttendanceFindUniqueOrThrowArgs>(args: SelectSubset<T, AttendanceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Attendance that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceFindFirstArgs} args - Arguments to find a Attendance
     * @example
     * // Get one Attendance
     * const attendance = await prisma.attendance.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AttendanceFindFirstArgs>(args?: SelectSubset<T, AttendanceFindFirstArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Attendance that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceFindFirstOrThrowArgs} args - Arguments to find a Attendance
     * @example
     * // Get one Attendance
     * const attendance = await prisma.attendance.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AttendanceFindFirstOrThrowArgs>(args?: SelectSubset<T, AttendanceFindFirstOrThrowArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Attendances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Attendances
     * const attendances = await prisma.attendance.findMany()
     * 
     * // Get first 10 Attendances
     * const attendances = await prisma.attendance.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const attendanceWithIdOnly = await prisma.attendance.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AttendanceFindManyArgs>(args?: SelectSubset<T, AttendanceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Attendance.
     * @param {AttendanceCreateArgs} args - Arguments to create a Attendance.
     * @example
     * // Create one Attendance
     * const Attendance = await prisma.attendance.create({
     *   data: {
     *     // ... data to create a Attendance
     *   }
     * })
     * 
     */
    create<T extends AttendanceCreateArgs>(args: SelectSubset<T, AttendanceCreateArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Attendances.
     * @param {AttendanceCreateManyArgs} args - Arguments to create many Attendances.
     * @example
     * // Create many Attendances
     * const attendance = await prisma.attendance.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AttendanceCreateManyArgs>(args?: SelectSubset<T, AttendanceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Attendances and returns the data saved in the database.
     * @param {AttendanceCreateManyAndReturnArgs} args - Arguments to create many Attendances.
     * @example
     * // Create many Attendances
     * const attendance = await prisma.attendance.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Attendances and only return the `id`
     * const attendanceWithIdOnly = await prisma.attendance.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AttendanceCreateManyAndReturnArgs>(args?: SelectSubset<T, AttendanceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Attendance.
     * @param {AttendanceDeleteArgs} args - Arguments to delete one Attendance.
     * @example
     * // Delete one Attendance
     * const Attendance = await prisma.attendance.delete({
     *   where: {
     *     // ... filter to delete one Attendance
     *   }
     * })
     * 
     */
    delete<T extends AttendanceDeleteArgs>(args: SelectSubset<T, AttendanceDeleteArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Attendance.
     * @param {AttendanceUpdateArgs} args - Arguments to update one Attendance.
     * @example
     * // Update one Attendance
     * const attendance = await prisma.attendance.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AttendanceUpdateArgs>(args: SelectSubset<T, AttendanceUpdateArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Attendances.
     * @param {AttendanceDeleteManyArgs} args - Arguments to filter Attendances to delete.
     * @example
     * // Delete a few Attendances
     * const { count } = await prisma.attendance.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AttendanceDeleteManyArgs>(args?: SelectSubset<T, AttendanceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Attendances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Attendances
     * const attendance = await prisma.attendance.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AttendanceUpdateManyArgs>(args: SelectSubset<T, AttendanceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Attendance.
     * @param {AttendanceUpsertArgs} args - Arguments to update or create a Attendance.
     * @example
     * // Update or create a Attendance
     * const attendance = await prisma.attendance.upsert({
     *   create: {
     *     // ... data to create a Attendance
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Attendance we want to update
     *   }
     * })
     */
    upsert<T extends AttendanceUpsertArgs>(args: SelectSubset<T, AttendanceUpsertArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Attendances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceCountArgs} args - Arguments to filter Attendances to count.
     * @example
     * // Count the number of Attendances
     * const count = await prisma.attendance.count({
     *   where: {
     *     // ... the filter for the Attendances we want to count
     *   }
     * })
    **/
    count<T extends AttendanceCountArgs>(
      args?: Subset<T, AttendanceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AttendanceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Attendance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AttendanceAggregateArgs>(args: Subset<T, AttendanceAggregateArgs>): Prisma.PrismaPromise<GetAttendanceAggregateType<T>>

    /**
     * Group by Attendance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AttendanceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AttendanceGroupByArgs['orderBy'] }
        : { orderBy?: AttendanceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AttendanceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAttendanceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Attendance model
   */
  readonly fields: AttendanceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Attendance.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AttendanceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employee<T extends EmployeeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployeeDefaultArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    breaks<T extends Attendance$breaksArgs<ExtArgs> = {}>(args?: Subset<T, Attendance$breaksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BreakPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Attendance model
   */ 
  interface AttendanceFieldRefs {
    readonly id: FieldRef<"Attendance", 'String'>
    readonly employeeId: FieldRef<"Attendance", 'String'>
    readonly date: FieldRef<"Attendance", 'DateTime'>
    readonly clockIn: FieldRef<"Attendance", 'DateTime'>
    readonly clockOut: FieldRef<"Attendance", 'DateTime'>
    readonly clockInLat: FieldRef<"Attendance", 'Float'>
    readonly clockInLong: FieldRef<"Attendance", 'Float'>
    readonly clockOutLat: FieldRef<"Attendance", 'Float'>
    readonly clockOutLong: FieldRef<"Attendance", 'Float'>
    readonly biometricProof: FieldRef<"Attendance", 'String'>
    readonly status: FieldRef<"Attendance", 'String'>
    readonly createdAt: FieldRef<"Attendance", 'DateTime'>
    readonly updatedAt: FieldRef<"Attendance", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Attendance findUnique
   */
  export type AttendanceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter, which Attendance to fetch.
     */
    where: AttendanceWhereUniqueInput
  }

  /**
   * Attendance findUniqueOrThrow
   */
  export type AttendanceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter, which Attendance to fetch.
     */
    where: AttendanceWhereUniqueInput
  }

  /**
   * Attendance findFirst
   */
  export type AttendanceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter, which Attendance to fetch.
     */
    where?: AttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attendances to fetch.
     */
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Attendances.
     */
    cursor?: AttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attendances.
     */
    distinct?: AttendanceScalarFieldEnum | AttendanceScalarFieldEnum[]
  }

  /**
   * Attendance findFirstOrThrow
   */
  export type AttendanceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter, which Attendance to fetch.
     */
    where?: AttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attendances to fetch.
     */
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Attendances.
     */
    cursor?: AttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attendances.
     */
    distinct?: AttendanceScalarFieldEnum | AttendanceScalarFieldEnum[]
  }

  /**
   * Attendance findMany
   */
  export type AttendanceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter, which Attendances to fetch.
     */
    where?: AttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attendances to fetch.
     */
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Attendances.
     */
    cursor?: AttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attendances.
     */
    skip?: number
    distinct?: AttendanceScalarFieldEnum | AttendanceScalarFieldEnum[]
  }

  /**
   * Attendance create
   */
  export type AttendanceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * The data needed to create a Attendance.
     */
    data: XOR<AttendanceCreateInput, AttendanceUncheckedCreateInput>
  }

  /**
   * Attendance createMany
   */
  export type AttendanceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Attendances.
     */
    data: AttendanceCreateManyInput | AttendanceCreateManyInput[]
  }

  /**
   * Attendance createManyAndReturn
   */
  export type AttendanceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Attendances.
     */
    data: AttendanceCreateManyInput | AttendanceCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Attendance update
   */
  export type AttendanceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * The data needed to update a Attendance.
     */
    data: XOR<AttendanceUpdateInput, AttendanceUncheckedUpdateInput>
    /**
     * Choose, which Attendance to update.
     */
    where: AttendanceWhereUniqueInput
  }

  /**
   * Attendance updateMany
   */
  export type AttendanceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Attendances.
     */
    data: XOR<AttendanceUpdateManyMutationInput, AttendanceUncheckedUpdateManyInput>
    /**
     * Filter which Attendances to update
     */
    where?: AttendanceWhereInput
  }

  /**
   * Attendance upsert
   */
  export type AttendanceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * The filter to search for the Attendance to update in case it exists.
     */
    where: AttendanceWhereUniqueInput
    /**
     * In case the Attendance found by the `where` argument doesn't exist, create a new Attendance with this data.
     */
    create: XOR<AttendanceCreateInput, AttendanceUncheckedCreateInput>
    /**
     * In case the Attendance was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AttendanceUpdateInput, AttendanceUncheckedUpdateInput>
  }

  /**
   * Attendance delete
   */
  export type AttendanceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter which Attendance to delete.
     */
    where: AttendanceWhereUniqueInput
  }

  /**
   * Attendance deleteMany
   */
  export type AttendanceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Attendances to delete
     */
    where?: AttendanceWhereInput
  }

  /**
   * Attendance.breaks
   */
  export type Attendance$breaksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Break
     */
    select?: BreakSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BreakInclude<ExtArgs> | null
    where?: BreakWhereInput
    orderBy?: BreakOrderByWithRelationInput | BreakOrderByWithRelationInput[]
    cursor?: BreakWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BreakScalarFieldEnum | BreakScalarFieldEnum[]
  }

  /**
   * Attendance without action
   */
  export type AttendanceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
  }


  /**
   * Model Break
   */

  export type AggregateBreak = {
    _count: BreakCountAggregateOutputType | null
    _min: BreakMinAggregateOutputType | null
    _max: BreakMaxAggregateOutputType | null
  }

  export type BreakMinAggregateOutputType = {
    id: string | null
    startTime: Date | null
    endTime: Date | null
    attendanceId: string | null
  }

  export type BreakMaxAggregateOutputType = {
    id: string | null
    startTime: Date | null
    endTime: Date | null
    attendanceId: string | null
  }

  export type BreakCountAggregateOutputType = {
    id: number
    startTime: number
    endTime: number
    attendanceId: number
    _all: number
  }


  export type BreakMinAggregateInputType = {
    id?: true
    startTime?: true
    endTime?: true
    attendanceId?: true
  }

  export type BreakMaxAggregateInputType = {
    id?: true
    startTime?: true
    endTime?: true
    attendanceId?: true
  }

  export type BreakCountAggregateInputType = {
    id?: true
    startTime?: true
    endTime?: true
    attendanceId?: true
    _all?: true
  }

  export type BreakAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Break to aggregate.
     */
    where?: BreakWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Breaks to fetch.
     */
    orderBy?: BreakOrderByWithRelationInput | BreakOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BreakWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Breaks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Breaks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Breaks
    **/
    _count?: true | BreakCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BreakMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BreakMaxAggregateInputType
  }

  export type GetBreakAggregateType<T extends BreakAggregateArgs> = {
        [P in keyof T & keyof AggregateBreak]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBreak[P]>
      : GetScalarType<T[P], AggregateBreak[P]>
  }




  export type BreakGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BreakWhereInput
    orderBy?: BreakOrderByWithAggregationInput | BreakOrderByWithAggregationInput[]
    by: BreakScalarFieldEnum[] | BreakScalarFieldEnum
    having?: BreakScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BreakCountAggregateInputType | true
    _min?: BreakMinAggregateInputType
    _max?: BreakMaxAggregateInputType
  }

  export type BreakGroupByOutputType = {
    id: string
    startTime: Date
    endTime: Date | null
    attendanceId: string
    _count: BreakCountAggregateOutputType | null
    _min: BreakMinAggregateOutputType | null
    _max: BreakMaxAggregateOutputType | null
  }

  type GetBreakGroupByPayload<T extends BreakGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BreakGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BreakGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BreakGroupByOutputType[P]>
            : GetScalarType<T[P], BreakGroupByOutputType[P]>
        }
      >
    >


  export type BreakSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    startTime?: boolean
    endTime?: boolean
    attendanceId?: boolean
    attendance?: boolean | AttendanceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["break"]>

  export type BreakSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    startTime?: boolean
    endTime?: boolean
    attendanceId?: boolean
    attendance?: boolean | AttendanceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["break"]>

  export type BreakSelectScalar = {
    id?: boolean
    startTime?: boolean
    endTime?: boolean
    attendanceId?: boolean
  }

  export type BreakInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attendance?: boolean | AttendanceDefaultArgs<ExtArgs>
  }
  export type BreakIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attendance?: boolean | AttendanceDefaultArgs<ExtArgs>
  }

  export type $BreakPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Break"
    objects: {
      attendance: Prisma.$AttendancePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      startTime: Date
      endTime: Date | null
      attendanceId: string
    }, ExtArgs["result"]["break"]>
    composites: {}
  }

  type BreakGetPayload<S extends boolean | null | undefined | BreakDefaultArgs> = $Result.GetResult<Prisma.$BreakPayload, S>

  type BreakCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BreakFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BreakCountAggregateInputType | true
    }

  export interface BreakDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Break'], meta: { name: 'Break' } }
    /**
     * Find zero or one Break that matches the filter.
     * @param {BreakFindUniqueArgs} args - Arguments to find a Break
     * @example
     * // Get one Break
     * const break = await prisma.break.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BreakFindUniqueArgs>(args: SelectSubset<T, BreakFindUniqueArgs<ExtArgs>>): Prisma__BreakClient<$Result.GetResult<Prisma.$BreakPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Break that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BreakFindUniqueOrThrowArgs} args - Arguments to find a Break
     * @example
     * // Get one Break
     * const break = await prisma.break.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BreakFindUniqueOrThrowArgs>(args: SelectSubset<T, BreakFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BreakClient<$Result.GetResult<Prisma.$BreakPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Break that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BreakFindFirstArgs} args - Arguments to find a Break
     * @example
     * // Get one Break
     * const break = await prisma.break.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BreakFindFirstArgs>(args?: SelectSubset<T, BreakFindFirstArgs<ExtArgs>>): Prisma__BreakClient<$Result.GetResult<Prisma.$BreakPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Break that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BreakFindFirstOrThrowArgs} args - Arguments to find a Break
     * @example
     * // Get one Break
     * const break = await prisma.break.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BreakFindFirstOrThrowArgs>(args?: SelectSubset<T, BreakFindFirstOrThrowArgs<ExtArgs>>): Prisma__BreakClient<$Result.GetResult<Prisma.$BreakPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Breaks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BreakFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Breaks
     * const breaks = await prisma.break.findMany()
     * 
     * // Get first 10 Breaks
     * const breaks = await prisma.break.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const breakWithIdOnly = await prisma.break.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BreakFindManyArgs>(args?: SelectSubset<T, BreakFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BreakPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Break.
     * @param {BreakCreateArgs} args - Arguments to create a Break.
     * @example
     * // Create one Break
     * const Break = await prisma.break.create({
     *   data: {
     *     // ... data to create a Break
     *   }
     * })
     * 
     */
    create<T extends BreakCreateArgs>(args: SelectSubset<T, BreakCreateArgs<ExtArgs>>): Prisma__BreakClient<$Result.GetResult<Prisma.$BreakPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Breaks.
     * @param {BreakCreateManyArgs} args - Arguments to create many Breaks.
     * @example
     * // Create many Breaks
     * const break = await prisma.break.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BreakCreateManyArgs>(args?: SelectSubset<T, BreakCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Breaks and returns the data saved in the database.
     * @param {BreakCreateManyAndReturnArgs} args - Arguments to create many Breaks.
     * @example
     * // Create many Breaks
     * const break = await prisma.break.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Breaks and only return the `id`
     * const breakWithIdOnly = await prisma.break.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BreakCreateManyAndReturnArgs>(args?: SelectSubset<T, BreakCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BreakPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Break.
     * @param {BreakDeleteArgs} args - Arguments to delete one Break.
     * @example
     * // Delete one Break
     * const Break = await prisma.break.delete({
     *   where: {
     *     // ... filter to delete one Break
     *   }
     * })
     * 
     */
    delete<T extends BreakDeleteArgs>(args: SelectSubset<T, BreakDeleteArgs<ExtArgs>>): Prisma__BreakClient<$Result.GetResult<Prisma.$BreakPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Break.
     * @param {BreakUpdateArgs} args - Arguments to update one Break.
     * @example
     * // Update one Break
     * const break = await prisma.break.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BreakUpdateArgs>(args: SelectSubset<T, BreakUpdateArgs<ExtArgs>>): Prisma__BreakClient<$Result.GetResult<Prisma.$BreakPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Breaks.
     * @param {BreakDeleteManyArgs} args - Arguments to filter Breaks to delete.
     * @example
     * // Delete a few Breaks
     * const { count } = await prisma.break.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BreakDeleteManyArgs>(args?: SelectSubset<T, BreakDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Breaks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BreakUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Breaks
     * const break = await prisma.break.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BreakUpdateManyArgs>(args: SelectSubset<T, BreakUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Break.
     * @param {BreakUpsertArgs} args - Arguments to update or create a Break.
     * @example
     * // Update or create a Break
     * const break = await prisma.break.upsert({
     *   create: {
     *     // ... data to create a Break
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Break we want to update
     *   }
     * })
     */
    upsert<T extends BreakUpsertArgs>(args: SelectSubset<T, BreakUpsertArgs<ExtArgs>>): Prisma__BreakClient<$Result.GetResult<Prisma.$BreakPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Breaks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BreakCountArgs} args - Arguments to filter Breaks to count.
     * @example
     * // Count the number of Breaks
     * const count = await prisma.break.count({
     *   where: {
     *     // ... the filter for the Breaks we want to count
     *   }
     * })
    **/
    count<T extends BreakCountArgs>(
      args?: Subset<T, BreakCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BreakCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Break.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BreakAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BreakAggregateArgs>(args: Subset<T, BreakAggregateArgs>): Prisma.PrismaPromise<GetBreakAggregateType<T>>

    /**
     * Group by Break.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BreakGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BreakGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BreakGroupByArgs['orderBy'] }
        : { orderBy?: BreakGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BreakGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBreakGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Break model
   */
  readonly fields: BreakFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Break.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BreakClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    attendance<T extends AttendanceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AttendanceDefaultArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Break model
   */ 
  interface BreakFieldRefs {
    readonly id: FieldRef<"Break", 'String'>
    readonly startTime: FieldRef<"Break", 'DateTime'>
    readonly endTime: FieldRef<"Break", 'DateTime'>
    readonly attendanceId: FieldRef<"Break", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Break findUnique
   */
  export type BreakFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Break
     */
    select?: BreakSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BreakInclude<ExtArgs> | null
    /**
     * Filter, which Break to fetch.
     */
    where: BreakWhereUniqueInput
  }

  /**
   * Break findUniqueOrThrow
   */
  export type BreakFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Break
     */
    select?: BreakSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BreakInclude<ExtArgs> | null
    /**
     * Filter, which Break to fetch.
     */
    where: BreakWhereUniqueInput
  }

  /**
   * Break findFirst
   */
  export type BreakFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Break
     */
    select?: BreakSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BreakInclude<ExtArgs> | null
    /**
     * Filter, which Break to fetch.
     */
    where?: BreakWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Breaks to fetch.
     */
    orderBy?: BreakOrderByWithRelationInput | BreakOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Breaks.
     */
    cursor?: BreakWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Breaks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Breaks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Breaks.
     */
    distinct?: BreakScalarFieldEnum | BreakScalarFieldEnum[]
  }

  /**
   * Break findFirstOrThrow
   */
  export type BreakFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Break
     */
    select?: BreakSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BreakInclude<ExtArgs> | null
    /**
     * Filter, which Break to fetch.
     */
    where?: BreakWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Breaks to fetch.
     */
    orderBy?: BreakOrderByWithRelationInput | BreakOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Breaks.
     */
    cursor?: BreakWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Breaks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Breaks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Breaks.
     */
    distinct?: BreakScalarFieldEnum | BreakScalarFieldEnum[]
  }

  /**
   * Break findMany
   */
  export type BreakFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Break
     */
    select?: BreakSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BreakInclude<ExtArgs> | null
    /**
     * Filter, which Breaks to fetch.
     */
    where?: BreakWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Breaks to fetch.
     */
    orderBy?: BreakOrderByWithRelationInput | BreakOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Breaks.
     */
    cursor?: BreakWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Breaks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Breaks.
     */
    skip?: number
    distinct?: BreakScalarFieldEnum | BreakScalarFieldEnum[]
  }

  /**
   * Break create
   */
  export type BreakCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Break
     */
    select?: BreakSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BreakInclude<ExtArgs> | null
    /**
     * The data needed to create a Break.
     */
    data: XOR<BreakCreateInput, BreakUncheckedCreateInput>
  }

  /**
   * Break createMany
   */
  export type BreakCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Breaks.
     */
    data: BreakCreateManyInput | BreakCreateManyInput[]
  }

  /**
   * Break createManyAndReturn
   */
  export type BreakCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Break
     */
    select?: BreakSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Breaks.
     */
    data: BreakCreateManyInput | BreakCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BreakIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Break update
   */
  export type BreakUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Break
     */
    select?: BreakSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BreakInclude<ExtArgs> | null
    /**
     * The data needed to update a Break.
     */
    data: XOR<BreakUpdateInput, BreakUncheckedUpdateInput>
    /**
     * Choose, which Break to update.
     */
    where: BreakWhereUniqueInput
  }

  /**
   * Break updateMany
   */
  export type BreakUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Breaks.
     */
    data: XOR<BreakUpdateManyMutationInput, BreakUncheckedUpdateManyInput>
    /**
     * Filter which Breaks to update
     */
    where?: BreakWhereInput
  }

  /**
   * Break upsert
   */
  export type BreakUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Break
     */
    select?: BreakSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BreakInclude<ExtArgs> | null
    /**
     * The filter to search for the Break to update in case it exists.
     */
    where: BreakWhereUniqueInput
    /**
     * In case the Break found by the `where` argument doesn't exist, create a new Break with this data.
     */
    create: XOR<BreakCreateInput, BreakUncheckedCreateInput>
    /**
     * In case the Break was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BreakUpdateInput, BreakUncheckedUpdateInput>
  }

  /**
   * Break delete
   */
  export type BreakDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Break
     */
    select?: BreakSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BreakInclude<ExtArgs> | null
    /**
     * Filter which Break to delete.
     */
    where: BreakWhereUniqueInput
  }

  /**
   * Break deleteMany
   */
  export type BreakDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Breaks to delete
     */
    where?: BreakWhereInput
  }

  /**
   * Break without action
   */
  export type BreakDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Break
     */
    select?: BreakSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BreakInclude<ExtArgs> | null
  }


  /**
   * Model Tracking
   */

  export type AggregateTracking = {
    _count: TrackingCountAggregateOutputType | null
    _avg: TrackingAvgAggregateOutputType | null
    _sum: TrackingSumAggregateOutputType | null
    _min: TrackingMinAggregateOutputType | null
    _max: TrackingMaxAggregateOutputType | null
  }

  export type TrackingAvgAggregateOutputType = {
    latitude: number | null
    longitude: number | null
  }

  export type TrackingSumAggregateOutputType = {
    latitude: number | null
    longitude: number | null
  }

  export type TrackingMinAggregateOutputType = {
    id: string | null
    latitude: number | null
    longitude: number | null
    timestamp: Date | null
    employeeId: string | null
  }

  export type TrackingMaxAggregateOutputType = {
    id: string | null
    latitude: number | null
    longitude: number | null
    timestamp: Date | null
    employeeId: string | null
  }

  export type TrackingCountAggregateOutputType = {
    id: number
    latitude: number
    longitude: number
    timestamp: number
    employeeId: number
    _all: number
  }


  export type TrackingAvgAggregateInputType = {
    latitude?: true
    longitude?: true
  }

  export type TrackingSumAggregateInputType = {
    latitude?: true
    longitude?: true
  }

  export type TrackingMinAggregateInputType = {
    id?: true
    latitude?: true
    longitude?: true
    timestamp?: true
    employeeId?: true
  }

  export type TrackingMaxAggregateInputType = {
    id?: true
    latitude?: true
    longitude?: true
    timestamp?: true
    employeeId?: true
  }

  export type TrackingCountAggregateInputType = {
    id?: true
    latitude?: true
    longitude?: true
    timestamp?: true
    employeeId?: true
    _all?: true
  }

  export type TrackingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tracking to aggregate.
     */
    where?: TrackingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trackings to fetch.
     */
    orderBy?: TrackingOrderByWithRelationInput | TrackingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TrackingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trackings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trackings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Trackings
    **/
    _count?: true | TrackingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TrackingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TrackingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TrackingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TrackingMaxAggregateInputType
  }

  export type GetTrackingAggregateType<T extends TrackingAggregateArgs> = {
        [P in keyof T & keyof AggregateTracking]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTracking[P]>
      : GetScalarType<T[P], AggregateTracking[P]>
  }




  export type TrackingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrackingWhereInput
    orderBy?: TrackingOrderByWithAggregationInput | TrackingOrderByWithAggregationInput[]
    by: TrackingScalarFieldEnum[] | TrackingScalarFieldEnum
    having?: TrackingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TrackingCountAggregateInputType | true
    _avg?: TrackingAvgAggregateInputType
    _sum?: TrackingSumAggregateInputType
    _min?: TrackingMinAggregateInputType
    _max?: TrackingMaxAggregateInputType
  }

  export type TrackingGroupByOutputType = {
    id: string
    latitude: number
    longitude: number
    timestamp: Date
    employeeId: string
    _count: TrackingCountAggregateOutputType | null
    _avg: TrackingAvgAggregateOutputType | null
    _sum: TrackingSumAggregateOutputType | null
    _min: TrackingMinAggregateOutputType | null
    _max: TrackingMaxAggregateOutputType | null
  }

  type GetTrackingGroupByPayload<T extends TrackingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TrackingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TrackingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TrackingGroupByOutputType[P]>
            : GetScalarType<T[P], TrackingGroupByOutputType[P]>
        }
      >
    >


  export type TrackingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    latitude?: boolean
    longitude?: boolean
    timestamp?: boolean
    employeeId?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tracking"]>

  export type TrackingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    latitude?: boolean
    longitude?: boolean
    timestamp?: boolean
    employeeId?: boolean
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tracking"]>

  export type TrackingSelectScalar = {
    id?: boolean
    latitude?: boolean
    longitude?: boolean
    timestamp?: boolean
    employeeId?: boolean
  }

  export type TrackingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }
  export type TrackingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }

  export type $TrackingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tracking"
    objects: {
      employee: Prisma.$EmployeePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      latitude: number
      longitude: number
      timestamp: Date
      employeeId: string
    }, ExtArgs["result"]["tracking"]>
    composites: {}
  }

  type TrackingGetPayload<S extends boolean | null | undefined | TrackingDefaultArgs> = $Result.GetResult<Prisma.$TrackingPayload, S>

  type TrackingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TrackingFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TrackingCountAggregateInputType | true
    }

  export interface TrackingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tracking'], meta: { name: 'Tracking' } }
    /**
     * Find zero or one Tracking that matches the filter.
     * @param {TrackingFindUniqueArgs} args - Arguments to find a Tracking
     * @example
     * // Get one Tracking
     * const tracking = await prisma.tracking.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TrackingFindUniqueArgs>(args: SelectSubset<T, TrackingFindUniqueArgs<ExtArgs>>): Prisma__TrackingClient<$Result.GetResult<Prisma.$TrackingPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Tracking that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TrackingFindUniqueOrThrowArgs} args - Arguments to find a Tracking
     * @example
     * // Get one Tracking
     * const tracking = await prisma.tracking.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TrackingFindUniqueOrThrowArgs>(args: SelectSubset<T, TrackingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TrackingClient<$Result.GetResult<Prisma.$TrackingPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Tracking that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingFindFirstArgs} args - Arguments to find a Tracking
     * @example
     * // Get one Tracking
     * const tracking = await prisma.tracking.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TrackingFindFirstArgs>(args?: SelectSubset<T, TrackingFindFirstArgs<ExtArgs>>): Prisma__TrackingClient<$Result.GetResult<Prisma.$TrackingPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Tracking that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingFindFirstOrThrowArgs} args - Arguments to find a Tracking
     * @example
     * // Get one Tracking
     * const tracking = await prisma.tracking.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TrackingFindFirstOrThrowArgs>(args?: SelectSubset<T, TrackingFindFirstOrThrowArgs<ExtArgs>>): Prisma__TrackingClient<$Result.GetResult<Prisma.$TrackingPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Trackings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Trackings
     * const trackings = await prisma.tracking.findMany()
     * 
     * // Get first 10 Trackings
     * const trackings = await prisma.tracking.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const trackingWithIdOnly = await prisma.tracking.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TrackingFindManyArgs>(args?: SelectSubset<T, TrackingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrackingPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Tracking.
     * @param {TrackingCreateArgs} args - Arguments to create a Tracking.
     * @example
     * // Create one Tracking
     * const Tracking = await prisma.tracking.create({
     *   data: {
     *     // ... data to create a Tracking
     *   }
     * })
     * 
     */
    create<T extends TrackingCreateArgs>(args: SelectSubset<T, TrackingCreateArgs<ExtArgs>>): Prisma__TrackingClient<$Result.GetResult<Prisma.$TrackingPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Trackings.
     * @param {TrackingCreateManyArgs} args - Arguments to create many Trackings.
     * @example
     * // Create many Trackings
     * const tracking = await prisma.tracking.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TrackingCreateManyArgs>(args?: SelectSubset<T, TrackingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Trackings and returns the data saved in the database.
     * @param {TrackingCreateManyAndReturnArgs} args - Arguments to create many Trackings.
     * @example
     * // Create many Trackings
     * const tracking = await prisma.tracking.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Trackings and only return the `id`
     * const trackingWithIdOnly = await prisma.tracking.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TrackingCreateManyAndReturnArgs>(args?: SelectSubset<T, TrackingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrackingPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Tracking.
     * @param {TrackingDeleteArgs} args - Arguments to delete one Tracking.
     * @example
     * // Delete one Tracking
     * const Tracking = await prisma.tracking.delete({
     *   where: {
     *     // ... filter to delete one Tracking
     *   }
     * })
     * 
     */
    delete<T extends TrackingDeleteArgs>(args: SelectSubset<T, TrackingDeleteArgs<ExtArgs>>): Prisma__TrackingClient<$Result.GetResult<Prisma.$TrackingPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Tracking.
     * @param {TrackingUpdateArgs} args - Arguments to update one Tracking.
     * @example
     * // Update one Tracking
     * const tracking = await prisma.tracking.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TrackingUpdateArgs>(args: SelectSubset<T, TrackingUpdateArgs<ExtArgs>>): Prisma__TrackingClient<$Result.GetResult<Prisma.$TrackingPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Trackings.
     * @param {TrackingDeleteManyArgs} args - Arguments to filter Trackings to delete.
     * @example
     * // Delete a few Trackings
     * const { count } = await prisma.tracking.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TrackingDeleteManyArgs>(args?: SelectSubset<T, TrackingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trackings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Trackings
     * const tracking = await prisma.tracking.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TrackingUpdateManyArgs>(args: SelectSubset<T, TrackingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Tracking.
     * @param {TrackingUpsertArgs} args - Arguments to update or create a Tracking.
     * @example
     * // Update or create a Tracking
     * const tracking = await prisma.tracking.upsert({
     *   create: {
     *     // ... data to create a Tracking
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tracking we want to update
     *   }
     * })
     */
    upsert<T extends TrackingUpsertArgs>(args: SelectSubset<T, TrackingUpsertArgs<ExtArgs>>): Prisma__TrackingClient<$Result.GetResult<Prisma.$TrackingPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Trackings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingCountArgs} args - Arguments to filter Trackings to count.
     * @example
     * // Count the number of Trackings
     * const count = await prisma.tracking.count({
     *   where: {
     *     // ... the filter for the Trackings we want to count
     *   }
     * })
    **/
    count<T extends TrackingCountArgs>(
      args?: Subset<T, TrackingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TrackingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tracking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TrackingAggregateArgs>(args: Subset<T, TrackingAggregateArgs>): Prisma.PrismaPromise<GetTrackingAggregateType<T>>

    /**
     * Group by Tracking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TrackingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TrackingGroupByArgs['orderBy'] }
        : { orderBy?: TrackingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TrackingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTrackingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tracking model
   */
  readonly fields: TrackingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tracking.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TrackingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employee<T extends EmployeeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployeeDefaultArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tracking model
   */ 
  interface TrackingFieldRefs {
    readonly id: FieldRef<"Tracking", 'String'>
    readonly latitude: FieldRef<"Tracking", 'Float'>
    readonly longitude: FieldRef<"Tracking", 'Float'>
    readonly timestamp: FieldRef<"Tracking", 'DateTime'>
    readonly employeeId: FieldRef<"Tracking", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Tracking findUnique
   */
  export type TrackingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tracking
     */
    select?: TrackingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingInclude<ExtArgs> | null
    /**
     * Filter, which Tracking to fetch.
     */
    where: TrackingWhereUniqueInput
  }

  /**
   * Tracking findUniqueOrThrow
   */
  export type TrackingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tracking
     */
    select?: TrackingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingInclude<ExtArgs> | null
    /**
     * Filter, which Tracking to fetch.
     */
    where: TrackingWhereUniqueInput
  }

  /**
   * Tracking findFirst
   */
  export type TrackingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tracking
     */
    select?: TrackingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingInclude<ExtArgs> | null
    /**
     * Filter, which Tracking to fetch.
     */
    where?: TrackingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trackings to fetch.
     */
    orderBy?: TrackingOrderByWithRelationInput | TrackingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Trackings.
     */
    cursor?: TrackingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trackings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trackings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trackings.
     */
    distinct?: TrackingScalarFieldEnum | TrackingScalarFieldEnum[]
  }

  /**
   * Tracking findFirstOrThrow
   */
  export type TrackingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tracking
     */
    select?: TrackingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingInclude<ExtArgs> | null
    /**
     * Filter, which Tracking to fetch.
     */
    where?: TrackingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trackings to fetch.
     */
    orderBy?: TrackingOrderByWithRelationInput | TrackingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Trackings.
     */
    cursor?: TrackingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trackings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trackings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trackings.
     */
    distinct?: TrackingScalarFieldEnum | TrackingScalarFieldEnum[]
  }

  /**
   * Tracking findMany
   */
  export type TrackingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tracking
     */
    select?: TrackingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingInclude<ExtArgs> | null
    /**
     * Filter, which Trackings to fetch.
     */
    where?: TrackingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trackings to fetch.
     */
    orderBy?: TrackingOrderByWithRelationInput | TrackingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Trackings.
     */
    cursor?: TrackingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trackings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trackings.
     */
    skip?: number
    distinct?: TrackingScalarFieldEnum | TrackingScalarFieldEnum[]
  }

  /**
   * Tracking create
   */
  export type TrackingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tracking
     */
    select?: TrackingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingInclude<ExtArgs> | null
    /**
     * The data needed to create a Tracking.
     */
    data: XOR<TrackingCreateInput, TrackingUncheckedCreateInput>
  }

  /**
   * Tracking createMany
   */
  export type TrackingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Trackings.
     */
    data: TrackingCreateManyInput | TrackingCreateManyInput[]
  }

  /**
   * Tracking createManyAndReturn
   */
  export type TrackingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tracking
     */
    select?: TrackingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Trackings.
     */
    data: TrackingCreateManyInput | TrackingCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Tracking update
   */
  export type TrackingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tracking
     */
    select?: TrackingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingInclude<ExtArgs> | null
    /**
     * The data needed to update a Tracking.
     */
    data: XOR<TrackingUpdateInput, TrackingUncheckedUpdateInput>
    /**
     * Choose, which Tracking to update.
     */
    where: TrackingWhereUniqueInput
  }

  /**
   * Tracking updateMany
   */
  export type TrackingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Trackings.
     */
    data: XOR<TrackingUpdateManyMutationInput, TrackingUncheckedUpdateManyInput>
    /**
     * Filter which Trackings to update
     */
    where?: TrackingWhereInput
  }

  /**
   * Tracking upsert
   */
  export type TrackingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tracking
     */
    select?: TrackingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingInclude<ExtArgs> | null
    /**
     * The filter to search for the Tracking to update in case it exists.
     */
    where: TrackingWhereUniqueInput
    /**
     * In case the Tracking found by the `where` argument doesn't exist, create a new Tracking with this data.
     */
    create: XOR<TrackingCreateInput, TrackingUncheckedCreateInput>
    /**
     * In case the Tracking was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TrackingUpdateInput, TrackingUncheckedUpdateInput>
  }

  /**
   * Tracking delete
   */
  export type TrackingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tracking
     */
    select?: TrackingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingInclude<ExtArgs> | null
    /**
     * Filter which Tracking to delete.
     */
    where: TrackingWhereUniqueInput
  }

  /**
   * Tracking deleteMany
   */
  export type TrackingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Trackings to delete
     */
    where?: TrackingWhereInput
  }

  /**
   * Tracking without action
   */
  export type TrackingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tracking
     */
    select?: TrackingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingInclude<ExtArgs> | null
  }


  /**
   * Model SecurityAlert
   */

  export type AggregateSecurityAlert = {
    _count: SecurityAlertCountAggregateOutputType | null
    _min: SecurityAlertMinAggregateOutputType | null
    _max: SecurityAlertMaxAggregateOutputType | null
  }

  export type SecurityAlertMinAggregateOutputType = {
    id: string | null
    type: string | null
    message: string | null
    severity: string | null
    employeeId: string | null
    siteId: string | null
    timestamp: Date | null
  }

  export type SecurityAlertMaxAggregateOutputType = {
    id: string | null
    type: string | null
    message: string | null
    severity: string | null
    employeeId: string | null
    siteId: string | null
    timestamp: Date | null
  }

  export type SecurityAlertCountAggregateOutputType = {
    id: number
    type: number
    message: number
    severity: number
    employeeId: number
    siteId: number
    timestamp: number
    _all: number
  }


  export type SecurityAlertMinAggregateInputType = {
    id?: true
    type?: true
    message?: true
    severity?: true
    employeeId?: true
    siteId?: true
    timestamp?: true
  }

  export type SecurityAlertMaxAggregateInputType = {
    id?: true
    type?: true
    message?: true
    severity?: true
    employeeId?: true
    siteId?: true
    timestamp?: true
  }

  export type SecurityAlertCountAggregateInputType = {
    id?: true
    type?: true
    message?: true
    severity?: true
    employeeId?: true
    siteId?: true
    timestamp?: true
    _all?: true
  }

  export type SecurityAlertAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SecurityAlert to aggregate.
     */
    where?: SecurityAlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SecurityAlerts to fetch.
     */
    orderBy?: SecurityAlertOrderByWithRelationInput | SecurityAlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SecurityAlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SecurityAlerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SecurityAlerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SecurityAlerts
    **/
    _count?: true | SecurityAlertCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SecurityAlertMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SecurityAlertMaxAggregateInputType
  }

  export type GetSecurityAlertAggregateType<T extends SecurityAlertAggregateArgs> = {
        [P in keyof T & keyof AggregateSecurityAlert]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSecurityAlert[P]>
      : GetScalarType<T[P], AggregateSecurityAlert[P]>
  }




  export type SecurityAlertGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SecurityAlertWhereInput
    orderBy?: SecurityAlertOrderByWithAggregationInput | SecurityAlertOrderByWithAggregationInput[]
    by: SecurityAlertScalarFieldEnum[] | SecurityAlertScalarFieldEnum
    having?: SecurityAlertScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SecurityAlertCountAggregateInputType | true
    _min?: SecurityAlertMinAggregateInputType
    _max?: SecurityAlertMaxAggregateInputType
  }

  export type SecurityAlertGroupByOutputType = {
    id: string
    type: string
    message: string
    severity: string
    employeeId: string | null
    siteId: string | null
    timestamp: Date
    _count: SecurityAlertCountAggregateOutputType | null
    _min: SecurityAlertMinAggregateOutputType | null
    _max: SecurityAlertMaxAggregateOutputType | null
  }

  type GetSecurityAlertGroupByPayload<T extends SecurityAlertGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SecurityAlertGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SecurityAlertGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SecurityAlertGroupByOutputType[P]>
            : GetScalarType<T[P], SecurityAlertGroupByOutputType[P]>
        }
      >
    >


  export type SecurityAlertSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    message?: boolean
    severity?: boolean
    employeeId?: boolean
    siteId?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["securityAlert"]>

  export type SecurityAlertSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    message?: boolean
    severity?: boolean
    employeeId?: boolean
    siteId?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["securityAlert"]>

  export type SecurityAlertSelectScalar = {
    id?: boolean
    type?: boolean
    message?: boolean
    severity?: boolean
    employeeId?: boolean
    siteId?: boolean
    timestamp?: boolean
  }


  export type $SecurityAlertPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SecurityAlert"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: string
      message: string
      severity: string
      employeeId: string | null
      siteId: string | null
      timestamp: Date
    }, ExtArgs["result"]["securityAlert"]>
    composites: {}
  }

  type SecurityAlertGetPayload<S extends boolean | null | undefined | SecurityAlertDefaultArgs> = $Result.GetResult<Prisma.$SecurityAlertPayload, S>

  type SecurityAlertCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SecurityAlertFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SecurityAlertCountAggregateInputType | true
    }

  export interface SecurityAlertDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SecurityAlert'], meta: { name: 'SecurityAlert' } }
    /**
     * Find zero or one SecurityAlert that matches the filter.
     * @param {SecurityAlertFindUniqueArgs} args - Arguments to find a SecurityAlert
     * @example
     * // Get one SecurityAlert
     * const securityAlert = await prisma.securityAlert.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SecurityAlertFindUniqueArgs>(args: SelectSubset<T, SecurityAlertFindUniqueArgs<ExtArgs>>): Prisma__SecurityAlertClient<$Result.GetResult<Prisma.$SecurityAlertPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SecurityAlert that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SecurityAlertFindUniqueOrThrowArgs} args - Arguments to find a SecurityAlert
     * @example
     * // Get one SecurityAlert
     * const securityAlert = await prisma.securityAlert.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SecurityAlertFindUniqueOrThrowArgs>(args: SelectSubset<T, SecurityAlertFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SecurityAlertClient<$Result.GetResult<Prisma.$SecurityAlertPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SecurityAlert that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityAlertFindFirstArgs} args - Arguments to find a SecurityAlert
     * @example
     * // Get one SecurityAlert
     * const securityAlert = await prisma.securityAlert.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SecurityAlertFindFirstArgs>(args?: SelectSubset<T, SecurityAlertFindFirstArgs<ExtArgs>>): Prisma__SecurityAlertClient<$Result.GetResult<Prisma.$SecurityAlertPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SecurityAlert that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityAlertFindFirstOrThrowArgs} args - Arguments to find a SecurityAlert
     * @example
     * // Get one SecurityAlert
     * const securityAlert = await prisma.securityAlert.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SecurityAlertFindFirstOrThrowArgs>(args?: SelectSubset<T, SecurityAlertFindFirstOrThrowArgs<ExtArgs>>): Prisma__SecurityAlertClient<$Result.GetResult<Prisma.$SecurityAlertPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SecurityAlerts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityAlertFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SecurityAlerts
     * const securityAlerts = await prisma.securityAlert.findMany()
     * 
     * // Get first 10 SecurityAlerts
     * const securityAlerts = await prisma.securityAlert.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const securityAlertWithIdOnly = await prisma.securityAlert.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SecurityAlertFindManyArgs>(args?: SelectSubset<T, SecurityAlertFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SecurityAlertPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SecurityAlert.
     * @param {SecurityAlertCreateArgs} args - Arguments to create a SecurityAlert.
     * @example
     * // Create one SecurityAlert
     * const SecurityAlert = await prisma.securityAlert.create({
     *   data: {
     *     // ... data to create a SecurityAlert
     *   }
     * })
     * 
     */
    create<T extends SecurityAlertCreateArgs>(args: SelectSubset<T, SecurityAlertCreateArgs<ExtArgs>>): Prisma__SecurityAlertClient<$Result.GetResult<Prisma.$SecurityAlertPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SecurityAlerts.
     * @param {SecurityAlertCreateManyArgs} args - Arguments to create many SecurityAlerts.
     * @example
     * // Create many SecurityAlerts
     * const securityAlert = await prisma.securityAlert.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SecurityAlertCreateManyArgs>(args?: SelectSubset<T, SecurityAlertCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SecurityAlerts and returns the data saved in the database.
     * @param {SecurityAlertCreateManyAndReturnArgs} args - Arguments to create many SecurityAlerts.
     * @example
     * // Create many SecurityAlerts
     * const securityAlert = await prisma.securityAlert.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SecurityAlerts and only return the `id`
     * const securityAlertWithIdOnly = await prisma.securityAlert.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SecurityAlertCreateManyAndReturnArgs>(args?: SelectSubset<T, SecurityAlertCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SecurityAlertPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a SecurityAlert.
     * @param {SecurityAlertDeleteArgs} args - Arguments to delete one SecurityAlert.
     * @example
     * // Delete one SecurityAlert
     * const SecurityAlert = await prisma.securityAlert.delete({
     *   where: {
     *     // ... filter to delete one SecurityAlert
     *   }
     * })
     * 
     */
    delete<T extends SecurityAlertDeleteArgs>(args: SelectSubset<T, SecurityAlertDeleteArgs<ExtArgs>>): Prisma__SecurityAlertClient<$Result.GetResult<Prisma.$SecurityAlertPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SecurityAlert.
     * @param {SecurityAlertUpdateArgs} args - Arguments to update one SecurityAlert.
     * @example
     * // Update one SecurityAlert
     * const securityAlert = await prisma.securityAlert.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SecurityAlertUpdateArgs>(args: SelectSubset<T, SecurityAlertUpdateArgs<ExtArgs>>): Prisma__SecurityAlertClient<$Result.GetResult<Prisma.$SecurityAlertPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SecurityAlerts.
     * @param {SecurityAlertDeleteManyArgs} args - Arguments to filter SecurityAlerts to delete.
     * @example
     * // Delete a few SecurityAlerts
     * const { count } = await prisma.securityAlert.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SecurityAlertDeleteManyArgs>(args?: SelectSubset<T, SecurityAlertDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SecurityAlerts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityAlertUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SecurityAlerts
     * const securityAlert = await prisma.securityAlert.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SecurityAlertUpdateManyArgs>(args: SelectSubset<T, SecurityAlertUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SecurityAlert.
     * @param {SecurityAlertUpsertArgs} args - Arguments to update or create a SecurityAlert.
     * @example
     * // Update or create a SecurityAlert
     * const securityAlert = await prisma.securityAlert.upsert({
     *   create: {
     *     // ... data to create a SecurityAlert
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SecurityAlert we want to update
     *   }
     * })
     */
    upsert<T extends SecurityAlertUpsertArgs>(args: SelectSubset<T, SecurityAlertUpsertArgs<ExtArgs>>): Prisma__SecurityAlertClient<$Result.GetResult<Prisma.$SecurityAlertPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SecurityAlerts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityAlertCountArgs} args - Arguments to filter SecurityAlerts to count.
     * @example
     * // Count the number of SecurityAlerts
     * const count = await prisma.securityAlert.count({
     *   where: {
     *     // ... the filter for the SecurityAlerts we want to count
     *   }
     * })
    **/
    count<T extends SecurityAlertCountArgs>(
      args?: Subset<T, SecurityAlertCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SecurityAlertCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SecurityAlert.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityAlertAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SecurityAlertAggregateArgs>(args: Subset<T, SecurityAlertAggregateArgs>): Prisma.PrismaPromise<GetSecurityAlertAggregateType<T>>

    /**
     * Group by SecurityAlert.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SecurityAlertGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SecurityAlertGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SecurityAlertGroupByArgs['orderBy'] }
        : { orderBy?: SecurityAlertGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SecurityAlertGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSecurityAlertGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SecurityAlert model
   */
  readonly fields: SecurityAlertFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SecurityAlert.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SecurityAlertClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SecurityAlert model
   */ 
  interface SecurityAlertFieldRefs {
    readonly id: FieldRef<"SecurityAlert", 'String'>
    readonly type: FieldRef<"SecurityAlert", 'String'>
    readonly message: FieldRef<"SecurityAlert", 'String'>
    readonly severity: FieldRef<"SecurityAlert", 'String'>
    readonly employeeId: FieldRef<"SecurityAlert", 'String'>
    readonly siteId: FieldRef<"SecurityAlert", 'String'>
    readonly timestamp: FieldRef<"SecurityAlert", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SecurityAlert findUnique
   */
  export type SecurityAlertFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityAlert
     */
    select?: SecurityAlertSelect<ExtArgs> | null
    /**
     * Filter, which SecurityAlert to fetch.
     */
    where: SecurityAlertWhereUniqueInput
  }

  /**
   * SecurityAlert findUniqueOrThrow
   */
  export type SecurityAlertFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityAlert
     */
    select?: SecurityAlertSelect<ExtArgs> | null
    /**
     * Filter, which SecurityAlert to fetch.
     */
    where: SecurityAlertWhereUniqueInput
  }

  /**
   * SecurityAlert findFirst
   */
  export type SecurityAlertFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityAlert
     */
    select?: SecurityAlertSelect<ExtArgs> | null
    /**
     * Filter, which SecurityAlert to fetch.
     */
    where?: SecurityAlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SecurityAlerts to fetch.
     */
    orderBy?: SecurityAlertOrderByWithRelationInput | SecurityAlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SecurityAlerts.
     */
    cursor?: SecurityAlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SecurityAlerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SecurityAlerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SecurityAlerts.
     */
    distinct?: SecurityAlertScalarFieldEnum | SecurityAlertScalarFieldEnum[]
  }

  /**
   * SecurityAlert findFirstOrThrow
   */
  export type SecurityAlertFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityAlert
     */
    select?: SecurityAlertSelect<ExtArgs> | null
    /**
     * Filter, which SecurityAlert to fetch.
     */
    where?: SecurityAlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SecurityAlerts to fetch.
     */
    orderBy?: SecurityAlertOrderByWithRelationInput | SecurityAlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SecurityAlerts.
     */
    cursor?: SecurityAlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SecurityAlerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SecurityAlerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SecurityAlerts.
     */
    distinct?: SecurityAlertScalarFieldEnum | SecurityAlertScalarFieldEnum[]
  }

  /**
   * SecurityAlert findMany
   */
  export type SecurityAlertFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityAlert
     */
    select?: SecurityAlertSelect<ExtArgs> | null
    /**
     * Filter, which SecurityAlerts to fetch.
     */
    where?: SecurityAlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SecurityAlerts to fetch.
     */
    orderBy?: SecurityAlertOrderByWithRelationInput | SecurityAlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SecurityAlerts.
     */
    cursor?: SecurityAlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SecurityAlerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SecurityAlerts.
     */
    skip?: number
    distinct?: SecurityAlertScalarFieldEnum | SecurityAlertScalarFieldEnum[]
  }

  /**
   * SecurityAlert create
   */
  export type SecurityAlertCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityAlert
     */
    select?: SecurityAlertSelect<ExtArgs> | null
    /**
     * The data needed to create a SecurityAlert.
     */
    data: XOR<SecurityAlertCreateInput, SecurityAlertUncheckedCreateInput>
  }

  /**
   * SecurityAlert createMany
   */
  export type SecurityAlertCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SecurityAlerts.
     */
    data: SecurityAlertCreateManyInput | SecurityAlertCreateManyInput[]
  }

  /**
   * SecurityAlert createManyAndReturn
   */
  export type SecurityAlertCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityAlert
     */
    select?: SecurityAlertSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many SecurityAlerts.
     */
    data: SecurityAlertCreateManyInput | SecurityAlertCreateManyInput[]
  }

  /**
   * SecurityAlert update
   */
  export type SecurityAlertUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityAlert
     */
    select?: SecurityAlertSelect<ExtArgs> | null
    /**
     * The data needed to update a SecurityAlert.
     */
    data: XOR<SecurityAlertUpdateInput, SecurityAlertUncheckedUpdateInput>
    /**
     * Choose, which SecurityAlert to update.
     */
    where: SecurityAlertWhereUniqueInput
  }

  /**
   * SecurityAlert updateMany
   */
  export type SecurityAlertUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SecurityAlerts.
     */
    data: XOR<SecurityAlertUpdateManyMutationInput, SecurityAlertUncheckedUpdateManyInput>
    /**
     * Filter which SecurityAlerts to update
     */
    where?: SecurityAlertWhereInput
  }

  /**
   * SecurityAlert upsert
   */
  export type SecurityAlertUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityAlert
     */
    select?: SecurityAlertSelect<ExtArgs> | null
    /**
     * The filter to search for the SecurityAlert to update in case it exists.
     */
    where: SecurityAlertWhereUniqueInput
    /**
     * In case the SecurityAlert found by the `where` argument doesn't exist, create a new SecurityAlert with this data.
     */
    create: XOR<SecurityAlertCreateInput, SecurityAlertUncheckedCreateInput>
    /**
     * In case the SecurityAlert was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SecurityAlertUpdateInput, SecurityAlertUncheckedUpdateInput>
  }

  /**
   * SecurityAlert delete
   */
  export type SecurityAlertDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityAlert
     */
    select?: SecurityAlertSelect<ExtArgs> | null
    /**
     * Filter which SecurityAlert to delete.
     */
    where: SecurityAlertWhereUniqueInput
  }

  /**
   * SecurityAlert deleteMany
   */
  export type SecurityAlertDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SecurityAlerts to delete
     */
    where?: SecurityAlertWhereInput
  }

  /**
   * SecurityAlert without action
   */
  export type SecurityAlertDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SecurityAlert
     */
    select?: SecurityAlertSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const EmployeeScalarFieldEnum: {
    id: 'id',
    employeeId: 'employeeId',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    password: 'password',
    role: 'role',
    phone: 'phone',
    designation: 'designation',
    status: 'status',
    avatar: 'avatar',
    siteId: 'siteId',
    isBiometricEnrolled: 'isBiometricEnrolled',
    biometricToken: 'biometricToken',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EmployeeScalarFieldEnum = (typeof EmployeeScalarFieldEnum)[keyof typeof EmployeeScalarFieldEnum]


  export const SiteScalarFieldEnum: {
    id: 'id',
    name: 'name',
    location: 'location',
    latitude: 'latitude',
    longitude: 'longitude',
    managerName: 'managerName',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SiteScalarFieldEnum = (typeof SiteScalarFieldEnum)[keyof typeof SiteScalarFieldEnum]


  export const AttendanceScalarFieldEnum: {
    id: 'id',
    employeeId: 'employeeId',
    date: 'date',
    clockIn: 'clockIn',
    clockOut: 'clockOut',
    clockInLat: 'clockInLat',
    clockInLong: 'clockInLong',
    clockOutLat: 'clockOutLat',
    clockOutLong: 'clockOutLong',
    biometricProof: 'biometricProof',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AttendanceScalarFieldEnum = (typeof AttendanceScalarFieldEnum)[keyof typeof AttendanceScalarFieldEnum]


  export const BreakScalarFieldEnum: {
    id: 'id',
    startTime: 'startTime',
    endTime: 'endTime',
    attendanceId: 'attendanceId'
  };

  export type BreakScalarFieldEnum = (typeof BreakScalarFieldEnum)[keyof typeof BreakScalarFieldEnum]


  export const TrackingScalarFieldEnum: {
    id: 'id',
    latitude: 'latitude',
    longitude: 'longitude',
    timestamp: 'timestamp',
    employeeId: 'employeeId'
  };

  export type TrackingScalarFieldEnum = (typeof TrackingScalarFieldEnum)[keyof typeof TrackingScalarFieldEnum]


  export const SecurityAlertScalarFieldEnum: {
    id: 'id',
    type: 'type',
    message: 'message',
    severity: 'severity',
    employeeId: 'employeeId',
    siteId: 'siteId',
    timestamp: 'timestamp'
  };

  export type SecurityAlertScalarFieldEnum = (typeof SecurityAlertScalarFieldEnum)[keyof typeof SecurityAlertScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    
  /**
   * Deep Input Types
   */


  export type EmployeeWhereInput = {
    AND?: EmployeeWhereInput | EmployeeWhereInput[]
    OR?: EmployeeWhereInput[]
    NOT?: EmployeeWhereInput | EmployeeWhereInput[]
    id?: StringFilter<"Employee"> | string
    employeeId?: StringFilter<"Employee"> | string
    firstName?: StringFilter<"Employee"> | string
    lastName?: StringFilter<"Employee"> | string
    email?: StringFilter<"Employee"> | string
    password?: StringFilter<"Employee"> | string
    role?: StringFilter<"Employee"> | string
    phone?: StringNullableFilter<"Employee"> | string | null
    designation?: StringNullableFilter<"Employee"> | string | null
    status?: StringFilter<"Employee"> | string
    avatar?: StringNullableFilter<"Employee"> | string | null
    siteId?: StringNullableFilter<"Employee"> | string | null
    isBiometricEnrolled?: BoolFilter<"Employee"> | boolean
    biometricToken?: StringNullableFilter<"Employee"> | string | null
    createdAt?: DateTimeFilter<"Employee"> | Date | string
    updatedAt?: DateTimeFilter<"Employee"> | Date | string
    site?: XOR<SiteNullableRelationFilter, SiteWhereInput> | null
    attendance?: AttendanceListRelationFilter
    tracking?: TrackingListRelationFilter
  }

  export type EmployeeOrderByWithRelationInput = {
    id?: SortOrder
    employeeId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    phone?: SortOrderInput | SortOrder
    designation?: SortOrderInput | SortOrder
    status?: SortOrder
    avatar?: SortOrderInput | SortOrder
    siteId?: SortOrderInput | SortOrder
    isBiometricEnrolled?: SortOrder
    biometricToken?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    site?: SiteOrderByWithRelationInput
    attendance?: AttendanceOrderByRelationAggregateInput
    tracking?: TrackingOrderByRelationAggregateInput
  }

  export type EmployeeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    employeeId?: string
    email?: string
    AND?: EmployeeWhereInput | EmployeeWhereInput[]
    OR?: EmployeeWhereInput[]
    NOT?: EmployeeWhereInput | EmployeeWhereInput[]
    firstName?: StringFilter<"Employee"> | string
    lastName?: StringFilter<"Employee"> | string
    password?: StringFilter<"Employee"> | string
    role?: StringFilter<"Employee"> | string
    phone?: StringNullableFilter<"Employee"> | string | null
    designation?: StringNullableFilter<"Employee"> | string | null
    status?: StringFilter<"Employee"> | string
    avatar?: StringNullableFilter<"Employee"> | string | null
    siteId?: StringNullableFilter<"Employee"> | string | null
    isBiometricEnrolled?: BoolFilter<"Employee"> | boolean
    biometricToken?: StringNullableFilter<"Employee"> | string | null
    createdAt?: DateTimeFilter<"Employee"> | Date | string
    updatedAt?: DateTimeFilter<"Employee"> | Date | string
    site?: XOR<SiteNullableRelationFilter, SiteWhereInput> | null
    attendance?: AttendanceListRelationFilter
    tracking?: TrackingListRelationFilter
  }, "id" | "employeeId" | "email">

  export type EmployeeOrderByWithAggregationInput = {
    id?: SortOrder
    employeeId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    phone?: SortOrderInput | SortOrder
    designation?: SortOrderInput | SortOrder
    status?: SortOrder
    avatar?: SortOrderInput | SortOrder
    siteId?: SortOrderInput | SortOrder
    isBiometricEnrolled?: SortOrder
    biometricToken?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EmployeeCountOrderByAggregateInput
    _max?: EmployeeMaxOrderByAggregateInput
    _min?: EmployeeMinOrderByAggregateInput
  }

  export type EmployeeScalarWhereWithAggregatesInput = {
    AND?: EmployeeScalarWhereWithAggregatesInput | EmployeeScalarWhereWithAggregatesInput[]
    OR?: EmployeeScalarWhereWithAggregatesInput[]
    NOT?: EmployeeScalarWhereWithAggregatesInput | EmployeeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Employee"> | string
    employeeId?: StringWithAggregatesFilter<"Employee"> | string
    firstName?: StringWithAggregatesFilter<"Employee"> | string
    lastName?: StringWithAggregatesFilter<"Employee"> | string
    email?: StringWithAggregatesFilter<"Employee"> | string
    password?: StringWithAggregatesFilter<"Employee"> | string
    role?: StringWithAggregatesFilter<"Employee"> | string
    phone?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    designation?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    status?: StringWithAggregatesFilter<"Employee"> | string
    avatar?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    siteId?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    isBiometricEnrolled?: BoolWithAggregatesFilter<"Employee"> | boolean
    biometricToken?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Employee"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Employee"> | Date | string
  }

  export type SiteWhereInput = {
    AND?: SiteWhereInput | SiteWhereInput[]
    OR?: SiteWhereInput[]
    NOT?: SiteWhereInput | SiteWhereInput[]
    id?: StringFilter<"Site"> | string
    name?: StringFilter<"Site"> | string
    location?: StringFilter<"Site"> | string
    latitude?: FloatNullableFilter<"Site"> | number | null
    longitude?: FloatNullableFilter<"Site"> | number | null
    managerName?: StringNullableFilter<"Site"> | string | null
    createdAt?: DateTimeFilter<"Site"> | Date | string
    updatedAt?: DateTimeFilter<"Site"> | Date | string
    employees?: EmployeeListRelationFilter
  }

  export type SiteOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    managerName?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    employees?: EmployeeOrderByRelationAggregateInput
  }

  export type SiteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SiteWhereInput | SiteWhereInput[]
    OR?: SiteWhereInput[]
    NOT?: SiteWhereInput | SiteWhereInput[]
    name?: StringFilter<"Site"> | string
    location?: StringFilter<"Site"> | string
    latitude?: FloatNullableFilter<"Site"> | number | null
    longitude?: FloatNullableFilter<"Site"> | number | null
    managerName?: StringNullableFilter<"Site"> | string | null
    createdAt?: DateTimeFilter<"Site"> | Date | string
    updatedAt?: DateTimeFilter<"Site"> | Date | string
    employees?: EmployeeListRelationFilter
  }, "id">

  export type SiteOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    managerName?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SiteCountOrderByAggregateInput
    _avg?: SiteAvgOrderByAggregateInput
    _max?: SiteMaxOrderByAggregateInput
    _min?: SiteMinOrderByAggregateInput
    _sum?: SiteSumOrderByAggregateInput
  }

  export type SiteScalarWhereWithAggregatesInput = {
    AND?: SiteScalarWhereWithAggregatesInput | SiteScalarWhereWithAggregatesInput[]
    OR?: SiteScalarWhereWithAggregatesInput[]
    NOT?: SiteScalarWhereWithAggregatesInput | SiteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Site"> | string
    name?: StringWithAggregatesFilter<"Site"> | string
    location?: StringWithAggregatesFilter<"Site"> | string
    latitude?: FloatNullableWithAggregatesFilter<"Site"> | number | null
    longitude?: FloatNullableWithAggregatesFilter<"Site"> | number | null
    managerName?: StringNullableWithAggregatesFilter<"Site"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Site"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Site"> | Date | string
  }

  export type AttendanceWhereInput = {
    AND?: AttendanceWhereInput | AttendanceWhereInput[]
    OR?: AttendanceWhereInput[]
    NOT?: AttendanceWhereInput | AttendanceWhereInput[]
    id?: StringFilter<"Attendance"> | string
    employeeId?: StringFilter<"Attendance"> | string
    date?: DateTimeFilter<"Attendance"> | Date | string
    clockIn?: DateTimeFilter<"Attendance"> | Date | string
    clockOut?: DateTimeNullableFilter<"Attendance"> | Date | string | null
    clockInLat?: FloatNullableFilter<"Attendance"> | number | null
    clockInLong?: FloatNullableFilter<"Attendance"> | number | null
    clockOutLat?: FloatNullableFilter<"Attendance"> | number | null
    clockOutLong?: FloatNullableFilter<"Attendance"> | number | null
    biometricProof?: StringNullableFilter<"Attendance"> | string | null
    status?: StringFilter<"Attendance"> | string
    createdAt?: DateTimeFilter<"Attendance"> | Date | string
    updatedAt?: DateTimeFilter<"Attendance"> | Date | string
    employee?: XOR<EmployeeRelationFilter, EmployeeWhereInput>
    breaks?: BreakListRelationFilter
  }

  export type AttendanceOrderByWithRelationInput = {
    id?: SortOrder
    employeeId?: SortOrder
    date?: SortOrder
    clockIn?: SortOrder
    clockOut?: SortOrderInput | SortOrder
    clockInLat?: SortOrderInput | SortOrder
    clockInLong?: SortOrderInput | SortOrder
    clockOutLat?: SortOrderInput | SortOrder
    clockOutLong?: SortOrderInput | SortOrder
    biometricProof?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    employee?: EmployeeOrderByWithRelationInput
    breaks?: BreakOrderByRelationAggregateInput
  }

  export type AttendanceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AttendanceWhereInput | AttendanceWhereInput[]
    OR?: AttendanceWhereInput[]
    NOT?: AttendanceWhereInput | AttendanceWhereInput[]
    employeeId?: StringFilter<"Attendance"> | string
    date?: DateTimeFilter<"Attendance"> | Date | string
    clockIn?: DateTimeFilter<"Attendance"> | Date | string
    clockOut?: DateTimeNullableFilter<"Attendance"> | Date | string | null
    clockInLat?: FloatNullableFilter<"Attendance"> | number | null
    clockInLong?: FloatNullableFilter<"Attendance"> | number | null
    clockOutLat?: FloatNullableFilter<"Attendance"> | number | null
    clockOutLong?: FloatNullableFilter<"Attendance"> | number | null
    biometricProof?: StringNullableFilter<"Attendance"> | string | null
    status?: StringFilter<"Attendance"> | string
    createdAt?: DateTimeFilter<"Attendance"> | Date | string
    updatedAt?: DateTimeFilter<"Attendance"> | Date | string
    employee?: XOR<EmployeeRelationFilter, EmployeeWhereInput>
    breaks?: BreakListRelationFilter
  }, "id">

  export type AttendanceOrderByWithAggregationInput = {
    id?: SortOrder
    employeeId?: SortOrder
    date?: SortOrder
    clockIn?: SortOrder
    clockOut?: SortOrderInput | SortOrder
    clockInLat?: SortOrderInput | SortOrder
    clockInLong?: SortOrderInput | SortOrder
    clockOutLat?: SortOrderInput | SortOrder
    clockOutLong?: SortOrderInput | SortOrder
    biometricProof?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AttendanceCountOrderByAggregateInput
    _avg?: AttendanceAvgOrderByAggregateInput
    _max?: AttendanceMaxOrderByAggregateInput
    _min?: AttendanceMinOrderByAggregateInput
    _sum?: AttendanceSumOrderByAggregateInput
  }

  export type AttendanceScalarWhereWithAggregatesInput = {
    AND?: AttendanceScalarWhereWithAggregatesInput | AttendanceScalarWhereWithAggregatesInput[]
    OR?: AttendanceScalarWhereWithAggregatesInput[]
    NOT?: AttendanceScalarWhereWithAggregatesInput | AttendanceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Attendance"> | string
    employeeId?: StringWithAggregatesFilter<"Attendance"> | string
    date?: DateTimeWithAggregatesFilter<"Attendance"> | Date | string
    clockIn?: DateTimeWithAggregatesFilter<"Attendance"> | Date | string
    clockOut?: DateTimeNullableWithAggregatesFilter<"Attendance"> | Date | string | null
    clockInLat?: FloatNullableWithAggregatesFilter<"Attendance"> | number | null
    clockInLong?: FloatNullableWithAggregatesFilter<"Attendance"> | number | null
    clockOutLat?: FloatNullableWithAggregatesFilter<"Attendance"> | number | null
    clockOutLong?: FloatNullableWithAggregatesFilter<"Attendance"> | number | null
    biometricProof?: StringNullableWithAggregatesFilter<"Attendance"> | string | null
    status?: StringWithAggregatesFilter<"Attendance"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Attendance"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Attendance"> | Date | string
  }

  export type BreakWhereInput = {
    AND?: BreakWhereInput | BreakWhereInput[]
    OR?: BreakWhereInput[]
    NOT?: BreakWhereInput | BreakWhereInput[]
    id?: StringFilter<"Break"> | string
    startTime?: DateTimeFilter<"Break"> | Date | string
    endTime?: DateTimeNullableFilter<"Break"> | Date | string | null
    attendanceId?: StringFilter<"Break"> | string
    attendance?: XOR<AttendanceRelationFilter, AttendanceWhereInput>
  }

  export type BreakOrderByWithRelationInput = {
    id?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrderInput | SortOrder
    attendanceId?: SortOrder
    attendance?: AttendanceOrderByWithRelationInput
  }

  export type BreakWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BreakWhereInput | BreakWhereInput[]
    OR?: BreakWhereInput[]
    NOT?: BreakWhereInput | BreakWhereInput[]
    startTime?: DateTimeFilter<"Break"> | Date | string
    endTime?: DateTimeNullableFilter<"Break"> | Date | string | null
    attendanceId?: StringFilter<"Break"> | string
    attendance?: XOR<AttendanceRelationFilter, AttendanceWhereInput>
  }, "id">

  export type BreakOrderByWithAggregationInput = {
    id?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrderInput | SortOrder
    attendanceId?: SortOrder
    _count?: BreakCountOrderByAggregateInput
    _max?: BreakMaxOrderByAggregateInput
    _min?: BreakMinOrderByAggregateInput
  }

  export type BreakScalarWhereWithAggregatesInput = {
    AND?: BreakScalarWhereWithAggregatesInput | BreakScalarWhereWithAggregatesInput[]
    OR?: BreakScalarWhereWithAggregatesInput[]
    NOT?: BreakScalarWhereWithAggregatesInput | BreakScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Break"> | string
    startTime?: DateTimeWithAggregatesFilter<"Break"> | Date | string
    endTime?: DateTimeNullableWithAggregatesFilter<"Break"> | Date | string | null
    attendanceId?: StringWithAggregatesFilter<"Break"> | string
  }

  export type TrackingWhereInput = {
    AND?: TrackingWhereInput | TrackingWhereInput[]
    OR?: TrackingWhereInput[]
    NOT?: TrackingWhereInput | TrackingWhereInput[]
    id?: StringFilter<"Tracking"> | string
    latitude?: FloatFilter<"Tracking"> | number
    longitude?: FloatFilter<"Tracking"> | number
    timestamp?: DateTimeFilter<"Tracking"> | Date | string
    employeeId?: StringFilter<"Tracking"> | string
    employee?: XOR<EmployeeRelationFilter, EmployeeWhereInput>
  }

  export type TrackingOrderByWithRelationInput = {
    id?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    timestamp?: SortOrder
    employeeId?: SortOrder
    employee?: EmployeeOrderByWithRelationInput
  }

  export type TrackingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TrackingWhereInput | TrackingWhereInput[]
    OR?: TrackingWhereInput[]
    NOT?: TrackingWhereInput | TrackingWhereInput[]
    latitude?: FloatFilter<"Tracking"> | number
    longitude?: FloatFilter<"Tracking"> | number
    timestamp?: DateTimeFilter<"Tracking"> | Date | string
    employeeId?: StringFilter<"Tracking"> | string
    employee?: XOR<EmployeeRelationFilter, EmployeeWhereInput>
  }, "id">

  export type TrackingOrderByWithAggregationInput = {
    id?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    timestamp?: SortOrder
    employeeId?: SortOrder
    _count?: TrackingCountOrderByAggregateInput
    _avg?: TrackingAvgOrderByAggregateInput
    _max?: TrackingMaxOrderByAggregateInput
    _min?: TrackingMinOrderByAggregateInput
    _sum?: TrackingSumOrderByAggregateInput
  }

  export type TrackingScalarWhereWithAggregatesInput = {
    AND?: TrackingScalarWhereWithAggregatesInput | TrackingScalarWhereWithAggregatesInput[]
    OR?: TrackingScalarWhereWithAggregatesInput[]
    NOT?: TrackingScalarWhereWithAggregatesInput | TrackingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Tracking"> | string
    latitude?: FloatWithAggregatesFilter<"Tracking"> | number
    longitude?: FloatWithAggregatesFilter<"Tracking"> | number
    timestamp?: DateTimeWithAggregatesFilter<"Tracking"> | Date | string
    employeeId?: StringWithAggregatesFilter<"Tracking"> | string
  }

  export type SecurityAlertWhereInput = {
    AND?: SecurityAlertWhereInput | SecurityAlertWhereInput[]
    OR?: SecurityAlertWhereInput[]
    NOT?: SecurityAlertWhereInput | SecurityAlertWhereInput[]
    id?: StringFilter<"SecurityAlert"> | string
    type?: StringFilter<"SecurityAlert"> | string
    message?: StringFilter<"SecurityAlert"> | string
    severity?: StringFilter<"SecurityAlert"> | string
    employeeId?: StringNullableFilter<"SecurityAlert"> | string | null
    siteId?: StringNullableFilter<"SecurityAlert"> | string | null
    timestamp?: DateTimeFilter<"SecurityAlert"> | Date | string
  }

  export type SecurityAlertOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    message?: SortOrder
    severity?: SortOrder
    employeeId?: SortOrderInput | SortOrder
    siteId?: SortOrderInput | SortOrder
    timestamp?: SortOrder
  }

  export type SecurityAlertWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SecurityAlertWhereInput | SecurityAlertWhereInput[]
    OR?: SecurityAlertWhereInput[]
    NOT?: SecurityAlertWhereInput | SecurityAlertWhereInput[]
    type?: StringFilter<"SecurityAlert"> | string
    message?: StringFilter<"SecurityAlert"> | string
    severity?: StringFilter<"SecurityAlert"> | string
    employeeId?: StringNullableFilter<"SecurityAlert"> | string | null
    siteId?: StringNullableFilter<"SecurityAlert"> | string | null
    timestamp?: DateTimeFilter<"SecurityAlert"> | Date | string
  }, "id">

  export type SecurityAlertOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    message?: SortOrder
    severity?: SortOrder
    employeeId?: SortOrderInput | SortOrder
    siteId?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    _count?: SecurityAlertCountOrderByAggregateInput
    _max?: SecurityAlertMaxOrderByAggregateInput
    _min?: SecurityAlertMinOrderByAggregateInput
  }

  export type SecurityAlertScalarWhereWithAggregatesInput = {
    AND?: SecurityAlertScalarWhereWithAggregatesInput | SecurityAlertScalarWhereWithAggregatesInput[]
    OR?: SecurityAlertScalarWhereWithAggregatesInput[]
    NOT?: SecurityAlertScalarWhereWithAggregatesInput | SecurityAlertScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SecurityAlert"> | string
    type?: StringWithAggregatesFilter<"SecurityAlert"> | string
    message?: StringWithAggregatesFilter<"SecurityAlert"> | string
    severity?: StringWithAggregatesFilter<"SecurityAlert"> | string
    employeeId?: StringNullableWithAggregatesFilter<"SecurityAlert"> | string | null
    siteId?: StringNullableWithAggregatesFilter<"SecurityAlert"> | string | null
    timestamp?: DateTimeWithAggregatesFilter<"SecurityAlert"> | Date | string
  }

  export type EmployeeCreateInput = {
    id?: string
    employeeId: string
    firstName: string
    lastName: string
    email: string
    password: string
    role?: string
    phone?: string | null
    designation?: string | null
    status?: string
    avatar?: string | null
    isBiometricEnrolled?: boolean
    biometricToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    site?: SiteCreateNestedOneWithoutEmployeesInput
    attendance?: AttendanceCreateNestedManyWithoutEmployeeInput
    tracking?: TrackingCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateInput = {
    id?: string
    employeeId: string
    firstName: string
    lastName: string
    email: string
    password: string
    role?: string
    phone?: string | null
    designation?: string | null
    status?: string
    avatar?: string | null
    siteId?: string | null
    isBiometricEnrolled?: boolean
    biometricToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attendance?: AttendanceUncheckedCreateNestedManyWithoutEmployeeInput
    tracking?: TrackingUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    isBiometricEnrolled?: BoolFieldUpdateOperationsInput | boolean
    biometricToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    site?: SiteUpdateOneWithoutEmployeesNestedInput
    attendance?: AttendanceUpdateManyWithoutEmployeeNestedInput
    tracking?: TrackingUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    siteId?: NullableStringFieldUpdateOperationsInput | string | null
    isBiometricEnrolled?: BoolFieldUpdateOperationsInput | boolean
    biometricToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendance?: AttendanceUncheckedUpdateManyWithoutEmployeeNestedInput
    tracking?: TrackingUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeCreateManyInput = {
    id?: string
    employeeId: string
    firstName: string
    lastName: string
    email: string
    password: string
    role?: string
    phone?: string | null
    designation?: string | null
    status?: string
    avatar?: string | null
    siteId?: string | null
    isBiometricEnrolled?: boolean
    biometricToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployeeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    isBiometricEnrolled?: BoolFieldUpdateOperationsInput | boolean
    biometricToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    siteId?: NullableStringFieldUpdateOperationsInput | string | null
    isBiometricEnrolled?: BoolFieldUpdateOperationsInput | boolean
    biometricToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiteCreateInput = {
    id?: string
    name: string
    location: string
    latitude?: number | null
    longitude?: number | null
    managerName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    employees?: EmployeeCreateNestedManyWithoutSiteInput
  }

  export type SiteUncheckedCreateInput = {
    id?: string
    name: string
    location: string
    latitude?: number | null
    longitude?: number | null
    managerName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    employees?: EmployeeUncheckedCreateNestedManyWithoutSiteInput
  }

  export type SiteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    managerName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employees?: EmployeeUpdateManyWithoutSiteNestedInput
  }

  export type SiteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    managerName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employees?: EmployeeUncheckedUpdateManyWithoutSiteNestedInput
  }

  export type SiteCreateManyInput = {
    id?: string
    name: string
    location: string
    latitude?: number | null
    longitude?: number | null
    managerName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SiteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    managerName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    managerName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceCreateInput = {
    id?: string
    date?: Date | string
    clockIn?: Date | string
    clockOut?: Date | string | null
    clockInLat?: number | null
    clockInLong?: number | null
    clockOutLat?: number | null
    clockOutLong?: number | null
    biometricProof?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    employee: EmployeeCreateNestedOneWithoutAttendanceInput
    breaks?: BreakCreateNestedManyWithoutAttendanceInput
  }

  export type AttendanceUncheckedCreateInput = {
    id?: string
    employeeId: string
    date?: Date | string
    clockIn?: Date | string
    clockOut?: Date | string | null
    clockInLat?: number | null
    clockInLong?: number | null
    clockOutLat?: number | null
    clockOutLong?: number | null
    biometricProof?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    breaks?: BreakUncheckedCreateNestedManyWithoutAttendanceInput
  }

  export type AttendanceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    clockIn?: DateTimeFieldUpdateOperationsInput | Date | string
    clockOut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clockInLat?: NullableFloatFieldUpdateOperationsInput | number | null
    clockInLong?: NullableFloatFieldUpdateOperationsInput | number | null
    clockOutLat?: NullableFloatFieldUpdateOperationsInput | number | null
    clockOutLong?: NullableFloatFieldUpdateOperationsInput | number | null
    biometricProof?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employee?: EmployeeUpdateOneRequiredWithoutAttendanceNestedInput
    breaks?: BreakUpdateManyWithoutAttendanceNestedInput
  }

  export type AttendanceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    clockIn?: DateTimeFieldUpdateOperationsInput | Date | string
    clockOut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clockInLat?: NullableFloatFieldUpdateOperationsInput | number | null
    clockInLong?: NullableFloatFieldUpdateOperationsInput | number | null
    clockOutLat?: NullableFloatFieldUpdateOperationsInput | number | null
    clockOutLong?: NullableFloatFieldUpdateOperationsInput | number | null
    biometricProof?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    breaks?: BreakUncheckedUpdateManyWithoutAttendanceNestedInput
  }

  export type AttendanceCreateManyInput = {
    id?: string
    employeeId: string
    date?: Date | string
    clockIn?: Date | string
    clockOut?: Date | string | null
    clockInLat?: number | null
    clockInLong?: number | null
    clockOutLat?: number | null
    clockOutLong?: number | null
    biometricProof?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AttendanceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    clockIn?: DateTimeFieldUpdateOperationsInput | Date | string
    clockOut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clockInLat?: NullableFloatFieldUpdateOperationsInput | number | null
    clockInLong?: NullableFloatFieldUpdateOperationsInput | number | null
    clockOutLat?: NullableFloatFieldUpdateOperationsInput | number | null
    clockOutLong?: NullableFloatFieldUpdateOperationsInput | number | null
    biometricProof?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    clockIn?: DateTimeFieldUpdateOperationsInput | Date | string
    clockOut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clockInLat?: NullableFloatFieldUpdateOperationsInput | number | null
    clockInLong?: NullableFloatFieldUpdateOperationsInput | number | null
    clockOutLat?: NullableFloatFieldUpdateOperationsInput | number | null
    clockOutLong?: NullableFloatFieldUpdateOperationsInput | number | null
    biometricProof?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BreakCreateInput = {
    id?: string
    startTime?: Date | string
    endTime?: Date | string | null
    attendance: AttendanceCreateNestedOneWithoutBreaksInput
  }

  export type BreakUncheckedCreateInput = {
    id?: string
    startTime?: Date | string
    endTime?: Date | string | null
    attendanceId: string
  }

  export type BreakUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    attendance?: AttendanceUpdateOneRequiredWithoutBreaksNestedInput
  }

  export type BreakUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    attendanceId?: StringFieldUpdateOperationsInput | string
  }

  export type BreakCreateManyInput = {
    id?: string
    startTime?: Date | string
    endTime?: Date | string | null
    attendanceId: string
  }

  export type BreakUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BreakUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    attendanceId?: StringFieldUpdateOperationsInput | string
  }

  export type TrackingCreateInput = {
    id?: string
    latitude: number
    longitude: number
    timestamp?: Date | string
    employee: EmployeeCreateNestedOneWithoutTrackingInput
  }

  export type TrackingUncheckedCreateInput = {
    id?: string
    latitude: number
    longitude: number
    timestamp?: Date | string
    employeeId: string
  }

  export type TrackingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    employee?: EmployeeUpdateOneRequiredWithoutTrackingNestedInput
  }

  export type TrackingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    employeeId?: StringFieldUpdateOperationsInput | string
  }

  export type TrackingCreateManyInput = {
    id?: string
    latitude: number
    longitude: number
    timestamp?: Date | string
    employeeId: string
  }

  export type TrackingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrackingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    employeeId?: StringFieldUpdateOperationsInput | string
  }

  export type SecurityAlertCreateInput = {
    id?: string
    type: string
    message: string
    severity?: string
    employeeId?: string | null
    siteId?: string | null
    timestamp?: Date | string
  }

  export type SecurityAlertUncheckedCreateInput = {
    id?: string
    type: string
    message: string
    severity?: string
    employeeId?: string | null
    siteId?: string | null
    timestamp?: Date | string
  }

  export type SecurityAlertUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    siteId?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SecurityAlertUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    siteId?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SecurityAlertCreateManyInput = {
    id?: string
    type: string
    message: string
    severity?: string
    employeeId?: string | null
    siteId?: string | null
    timestamp?: Date | string
  }

  export type SecurityAlertUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    siteId?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SecurityAlertUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    siteId?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SiteNullableRelationFilter = {
    is?: SiteWhereInput | null
    isNot?: SiteWhereInput | null
  }

  export type AttendanceListRelationFilter = {
    every?: AttendanceWhereInput
    some?: AttendanceWhereInput
    none?: AttendanceWhereInput
  }

  export type TrackingListRelationFilter = {
    every?: TrackingWhereInput
    some?: TrackingWhereInput
    none?: TrackingWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AttendanceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TrackingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmployeeCountOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    phone?: SortOrder
    designation?: SortOrder
    status?: SortOrder
    avatar?: SortOrder
    siteId?: SortOrder
    isBiometricEnrolled?: SortOrder
    biometricToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmployeeMaxOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    phone?: SortOrder
    designation?: SortOrder
    status?: SortOrder
    avatar?: SortOrder
    siteId?: SortOrder
    isBiometricEnrolled?: SortOrder
    biometricToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmployeeMinOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    phone?: SortOrder
    designation?: SortOrder
    status?: SortOrder
    avatar?: SortOrder
    siteId?: SortOrder
    isBiometricEnrolled?: SortOrder
    biometricToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type EmployeeListRelationFilter = {
    every?: EmployeeWhereInput
    some?: EmployeeWhereInput
    none?: EmployeeWhereInput
  }

  export type EmployeeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SiteCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    managerName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SiteAvgOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type SiteMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    managerName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SiteMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    managerName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SiteSumOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EmployeeRelationFilter = {
    is?: EmployeeWhereInput
    isNot?: EmployeeWhereInput
  }

  export type BreakListRelationFilter = {
    every?: BreakWhereInput
    some?: BreakWhereInput
    none?: BreakWhereInput
  }

  export type BreakOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AttendanceCountOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    date?: SortOrder
    clockIn?: SortOrder
    clockOut?: SortOrder
    clockInLat?: SortOrder
    clockInLong?: SortOrder
    clockOutLat?: SortOrder
    clockOutLong?: SortOrder
    biometricProof?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AttendanceAvgOrderByAggregateInput = {
    clockInLat?: SortOrder
    clockInLong?: SortOrder
    clockOutLat?: SortOrder
    clockOutLong?: SortOrder
  }

  export type AttendanceMaxOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    date?: SortOrder
    clockIn?: SortOrder
    clockOut?: SortOrder
    clockInLat?: SortOrder
    clockInLong?: SortOrder
    clockOutLat?: SortOrder
    clockOutLong?: SortOrder
    biometricProof?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AttendanceMinOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    date?: SortOrder
    clockIn?: SortOrder
    clockOut?: SortOrder
    clockInLat?: SortOrder
    clockInLong?: SortOrder
    clockOutLat?: SortOrder
    clockOutLong?: SortOrder
    biometricProof?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AttendanceSumOrderByAggregateInput = {
    clockInLat?: SortOrder
    clockInLong?: SortOrder
    clockOutLat?: SortOrder
    clockOutLong?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type AttendanceRelationFilter = {
    is?: AttendanceWhereInput
    isNot?: AttendanceWhereInput
  }

  export type BreakCountOrderByAggregateInput = {
    id?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    attendanceId?: SortOrder
  }

  export type BreakMaxOrderByAggregateInput = {
    id?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    attendanceId?: SortOrder
  }

  export type BreakMinOrderByAggregateInput = {
    id?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    attendanceId?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type TrackingCountOrderByAggregateInput = {
    id?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    timestamp?: SortOrder
    employeeId?: SortOrder
  }

  export type TrackingAvgOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type TrackingMaxOrderByAggregateInput = {
    id?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    timestamp?: SortOrder
    employeeId?: SortOrder
  }

  export type TrackingMinOrderByAggregateInput = {
    id?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    timestamp?: SortOrder
    employeeId?: SortOrder
  }

  export type TrackingSumOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type SecurityAlertCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    message?: SortOrder
    severity?: SortOrder
    employeeId?: SortOrder
    siteId?: SortOrder
    timestamp?: SortOrder
  }

  export type SecurityAlertMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    message?: SortOrder
    severity?: SortOrder
    employeeId?: SortOrder
    siteId?: SortOrder
    timestamp?: SortOrder
  }

  export type SecurityAlertMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    message?: SortOrder
    severity?: SortOrder
    employeeId?: SortOrder
    siteId?: SortOrder
    timestamp?: SortOrder
  }

  export type SiteCreateNestedOneWithoutEmployeesInput = {
    create?: XOR<SiteCreateWithoutEmployeesInput, SiteUncheckedCreateWithoutEmployeesInput>
    connectOrCreate?: SiteCreateOrConnectWithoutEmployeesInput
    connect?: SiteWhereUniqueInput
  }

  export type AttendanceCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<AttendanceCreateWithoutEmployeeInput, AttendanceUncheckedCreateWithoutEmployeeInput> | AttendanceCreateWithoutEmployeeInput[] | AttendanceUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: AttendanceCreateOrConnectWithoutEmployeeInput | AttendanceCreateOrConnectWithoutEmployeeInput[]
    createMany?: AttendanceCreateManyEmployeeInputEnvelope
    connect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
  }

  export type TrackingCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<TrackingCreateWithoutEmployeeInput, TrackingUncheckedCreateWithoutEmployeeInput> | TrackingCreateWithoutEmployeeInput[] | TrackingUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: TrackingCreateOrConnectWithoutEmployeeInput | TrackingCreateOrConnectWithoutEmployeeInput[]
    createMany?: TrackingCreateManyEmployeeInputEnvelope
    connect?: TrackingWhereUniqueInput | TrackingWhereUniqueInput[]
  }

  export type AttendanceUncheckedCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<AttendanceCreateWithoutEmployeeInput, AttendanceUncheckedCreateWithoutEmployeeInput> | AttendanceCreateWithoutEmployeeInput[] | AttendanceUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: AttendanceCreateOrConnectWithoutEmployeeInput | AttendanceCreateOrConnectWithoutEmployeeInput[]
    createMany?: AttendanceCreateManyEmployeeInputEnvelope
    connect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
  }

  export type TrackingUncheckedCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<TrackingCreateWithoutEmployeeInput, TrackingUncheckedCreateWithoutEmployeeInput> | TrackingCreateWithoutEmployeeInput[] | TrackingUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: TrackingCreateOrConnectWithoutEmployeeInput | TrackingCreateOrConnectWithoutEmployeeInput[]
    createMany?: TrackingCreateManyEmployeeInputEnvelope
    connect?: TrackingWhereUniqueInput | TrackingWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type SiteUpdateOneWithoutEmployeesNestedInput = {
    create?: XOR<SiteCreateWithoutEmployeesInput, SiteUncheckedCreateWithoutEmployeesInput>
    connectOrCreate?: SiteCreateOrConnectWithoutEmployeesInput
    upsert?: SiteUpsertWithoutEmployeesInput
    disconnect?: SiteWhereInput | boolean
    delete?: SiteWhereInput | boolean
    connect?: SiteWhereUniqueInput
    update?: XOR<XOR<SiteUpdateToOneWithWhereWithoutEmployeesInput, SiteUpdateWithoutEmployeesInput>, SiteUncheckedUpdateWithoutEmployeesInput>
  }

  export type AttendanceUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<AttendanceCreateWithoutEmployeeInput, AttendanceUncheckedCreateWithoutEmployeeInput> | AttendanceCreateWithoutEmployeeInput[] | AttendanceUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: AttendanceCreateOrConnectWithoutEmployeeInput | AttendanceCreateOrConnectWithoutEmployeeInput[]
    upsert?: AttendanceUpsertWithWhereUniqueWithoutEmployeeInput | AttendanceUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: AttendanceCreateManyEmployeeInputEnvelope
    set?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    disconnect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    delete?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    connect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    update?: AttendanceUpdateWithWhereUniqueWithoutEmployeeInput | AttendanceUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: AttendanceUpdateManyWithWhereWithoutEmployeeInput | AttendanceUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: AttendanceScalarWhereInput | AttendanceScalarWhereInput[]
  }

  export type TrackingUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<TrackingCreateWithoutEmployeeInput, TrackingUncheckedCreateWithoutEmployeeInput> | TrackingCreateWithoutEmployeeInput[] | TrackingUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: TrackingCreateOrConnectWithoutEmployeeInput | TrackingCreateOrConnectWithoutEmployeeInput[]
    upsert?: TrackingUpsertWithWhereUniqueWithoutEmployeeInput | TrackingUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: TrackingCreateManyEmployeeInputEnvelope
    set?: TrackingWhereUniqueInput | TrackingWhereUniqueInput[]
    disconnect?: TrackingWhereUniqueInput | TrackingWhereUniqueInput[]
    delete?: TrackingWhereUniqueInput | TrackingWhereUniqueInput[]
    connect?: TrackingWhereUniqueInput | TrackingWhereUniqueInput[]
    update?: TrackingUpdateWithWhereUniqueWithoutEmployeeInput | TrackingUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: TrackingUpdateManyWithWhereWithoutEmployeeInput | TrackingUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: TrackingScalarWhereInput | TrackingScalarWhereInput[]
  }

  export type AttendanceUncheckedUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<AttendanceCreateWithoutEmployeeInput, AttendanceUncheckedCreateWithoutEmployeeInput> | AttendanceCreateWithoutEmployeeInput[] | AttendanceUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: AttendanceCreateOrConnectWithoutEmployeeInput | AttendanceCreateOrConnectWithoutEmployeeInput[]
    upsert?: AttendanceUpsertWithWhereUniqueWithoutEmployeeInput | AttendanceUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: AttendanceCreateManyEmployeeInputEnvelope
    set?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    disconnect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    delete?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    connect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    update?: AttendanceUpdateWithWhereUniqueWithoutEmployeeInput | AttendanceUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: AttendanceUpdateManyWithWhereWithoutEmployeeInput | AttendanceUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: AttendanceScalarWhereInput | AttendanceScalarWhereInput[]
  }

  export type TrackingUncheckedUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<TrackingCreateWithoutEmployeeInput, TrackingUncheckedCreateWithoutEmployeeInput> | TrackingCreateWithoutEmployeeInput[] | TrackingUncheckedCreateWithoutEmployeeInput[]
    connectOrCreate?: TrackingCreateOrConnectWithoutEmployeeInput | TrackingCreateOrConnectWithoutEmployeeInput[]
    upsert?: TrackingUpsertWithWhereUniqueWithoutEmployeeInput | TrackingUpsertWithWhereUniqueWithoutEmployeeInput[]
    createMany?: TrackingCreateManyEmployeeInputEnvelope
    set?: TrackingWhereUniqueInput | TrackingWhereUniqueInput[]
    disconnect?: TrackingWhereUniqueInput | TrackingWhereUniqueInput[]
    delete?: TrackingWhereUniqueInput | TrackingWhereUniqueInput[]
    connect?: TrackingWhereUniqueInput | TrackingWhereUniqueInput[]
    update?: TrackingUpdateWithWhereUniqueWithoutEmployeeInput | TrackingUpdateWithWhereUniqueWithoutEmployeeInput[]
    updateMany?: TrackingUpdateManyWithWhereWithoutEmployeeInput | TrackingUpdateManyWithWhereWithoutEmployeeInput[]
    deleteMany?: TrackingScalarWhereInput | TrackingScalarWhereInput[]
  }

  export type EmployeeCreateNestedManyWithoutSiteInput = {
    create?: XOR<EmployeeCreateWithoutSiteInput, EmployeeUncheckedCreateWithoutSiteInput> | EmployeeCreateWithoutSiteInput[] | EmployeeUncheckedCreateWithoutSiteInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutSiteInput | EmployeeCreateOrConnectWithoutSiteInput[]
    createMany?: EmployeeCreateManySiteInputEnvelope
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
  }

  export type EmployeeUncheckedCreateNestedManyWithoutSiteInput = {
    create?: XOR<EmployeeCreateWithoutSiteInput, EmployeeUncheckedCreateWithoutSiteInput> | EmployeeCreateWithoutSiteInput[] | EmployeeUncheckedCreateWithoutSiteInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutSiteInput | EmployeeCreateOrConnectWithoutSiteInput[]
    createMany?: EmployeeCreateManySiteInputEnvelope
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EmployeeUpdateManyWithoutSiteNestedInput = {
    create?: XOR<EmployeeCreateWithoutSiteInput, EmployeeUncheckedCreateWithoutSiteInput> | EmployeeCreateWithoutSiteInput[] | EmployeeUncheckedCreateWithoutSiteInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutSiteInput | EmployeeCreateOrConnectWithoutSiteInput[]
    upsert?: EmployeeUpsertWithWhereUniqueWithoutSiteInput | EmployeeUpsertWithWhereUniqueWithoutSiteInput[]
    createMany?: EmployeeCreateManySiteInputEnvelope
    set?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    disconnect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    delete?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    update?: EmployeeUpdateWithWhereUniqueWithoutSiteInput | EmployeeUpdateWithWhereUniqueWithoutSiteInput[]
    updateMany?: EmployeeUpdateManyWithWhereWithoutSiteInput | EmployeeUpdateManyWithWhereWithoutSiteInput[]
    deleteMany?: EmployeeScalarWhereInput | EmployeeScalarWhereInput[]
  }

  export type EmployeeUncheckedUpdateManyWithoutSiteNestedInput = {
    create?: XOR<EmployeeCreateWithoutSiteInput, EmployeeUncheckedCreateWithoutSiteInput> | EmployeeCreateWithoutSiteInput[] | EmployeeUncheckedCreateWithoutSiteInput[]
    connectOrCreate?: EmployeeCreateOrConnectWithoutSiteInput | EmployeeCreateOrConnectWithoutSiteInput[]
    upsert?: EmployeeUpsertWithWhereUniqueWithoutSiteInput | EmployeeUpsertWithWhereUniqueWithoutSiteInput[]
    createMany?: EmployeeCreateManySiteInputEnvelope
    set?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    disconnect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    delete?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    connect?: EmployeeWhereUniqueInput | EmployeeWhereUniqueInput[]
    update?: EmployeeUpdateWithWhereUniqueWithoutSiteInput | EmployeeUpdateWithWhereUniqueWithoutSiteInput[]
    updateMany?: EmployeeUpdateManyWithWhereWithoutSiteInput | EmployeeUpdateManyWithWhereWithoutSiteInput[]
    deleteMany?: EmployeeScalarWhereInput | EmployeeScalarWhereInput[]
  }

  export type EmployeeCreateNestedOneWithoutAttendanceInput = {
    create?: XOR<EmployeeCreateWithoutAttendanceInput, EmployeeUncheckedCreateWithoutAttendanceInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutAttendanceInput
    connect?: EmployeeWhereUniqueInput
  }

  export type BreakCreateNestedManyWithoutAttendanceInput = {
    create?: XOR<BreakCreateWithoutAttendanceInput, BreakUncheckedCreateWithoutAttendanceInput> | BreakCreateWithoutAttendanceInput[] | BreakUncheckedCreateWithoutAttendanceInput[]
    connectOrCreate?: BreakCreateOrConnectWithoutAttendanceInput | BreakCreateOrConnectWithoutAttendanceInput[]
    createMany?: BreakCreateManyAttendanceInputEnvelope
    connect?: BreakWhereUniqueInput | BreakWhereUniqueInput[]
  }

  export type BreakUncheckedCreateNestedManyWithoutAttendanceInput = {
    create?: XOR<BreakCreateWithoutAttendanceInput, BreakUncheckedCreateWithoutAttendanceInput> | BreakCreateWithoutAttendanceInput[] | BreakUncheckedCreateWithoutAttendanceInput[]
    connectOrCreate?: BreakCreateOrConnectWithoutAttendanceInput | BreakCreateOrConnectWithoutAttendanceInput[]
    createMany?: BreakCreateManyAttendanceInputEnvelope
    connect?: BreakWhereUniqueInput | BreakWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EmployeeUpdateOneRequiredWithoutAttendanceNestedInput = {
    create?: XOR<EmployeeCreateWithoutAttendanceInput, EmployeeUncheckedCreateWithoutAttendanceInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutAttendanceInput
    upsert?: EmployeeUpsertWithoutAttendanceInput
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutAttendanceInput, EmployeeUpdateWithoutAttendanceInput>, EmployeeUncheckedUpdateWithoutAttendanceInput>
  }

  export type BreakUpdateManyWithoutAttendanceNestedInput = {
    create?: XOR<BreakCreateWithoutAttendanceInput, BreakUncheckedCreateWithoutAttendanceInput> | BreakCreateWithoutAttendanceInput[] | BreakUncheckedCreateWithoutAttendanceInput[]
    connectOrCreate?: BreakCreateOrConnectWithoutAttendanceInput | BreakCreateOrConnectWithoutAttendanceInput[]
    upsert?: BreakUpsertWithWhereUniqueWithoutAttendanceInput | BreakUpsertWithWhereUniqueWithoutAttendanceInput[]
    createMany?: BreakCreateManyAttendanceInputEnvelope
    set?: BreakWhereUniqueInput | BreakWhereUniqueInput[]
    disconnect?: BreakWhereUniqueInput | BreakWhereUniqueInput[]
    delete?: BreakWhereUniqueInput | BreakWhereUniqueInput[]
    connect?: BreakWhereUniqueInput | BreakWhereUniqueInput[]
    update?: BreakUpdateWithWhereUniqueWithoutAttendanceInput | BreakUpdateWithWhereUniqueWithoutAttendanceInput[]
    updateMany?: BreakUpdateManyWithWhereWithoutAttendanceInput | BreakUpdateManyWithWhereWithoutAttendanceInput[]
    deleteMany?: BreakScalarWhereInput | BreakScalarWhereInput[]
  }

  export type BreakUncheckedUpdateManyWithoutAttendanceNestedInput = {
    create?: XOR<BreakCreateWithoutAttendanceInput, BreakUncheckedCreateWithoutAttendanceInput> | BreakCreateWithoutAttendanceInput[] | BreakUncheckedCreateWithoutAttendanceInput[]
    connectOrCreate?: BreakCreateOrConnectWithoutAttendanceInput | BreakCreateOrConnectWithoutAttendanceInput[]
    upsert?: BreakUpsertWithWhereUniqueWithoutAttendanceInput | BreakUpsertWithWhereUniqueWithoutAttendanceInput[]
    createMany?: BreakCreateManyAttendanceInputEnvelope
    set?: BreakWhereUniqueInput | BreakWhereUniqueInput[]
    disconnect?: BreakWhereUniqueInput | BreakWhereUniqueInput[]
    delete?: BreakWhereUniqueInput | BreakWhereUniqueInput[]
    connect?: BreakWhereUniqueInput | BreakWhereUniqueInput[]
    update?: BreakUpdateWithWhereUniqueWithoutAttendanceInput | BreakUpdateWithWhereUniqueWithoutAttendanceInput[]
    updateMany?: BreakUpdateManyWithWhereWithoutAttendanceInput | BreakUpdateManyWithWhereWithoutAttendanceInput[]
    deleteMany?: BreakScalarWhereInput | BreakScalarWhereInput[]
  }

  export type AttendanceCreateNestedOneWithoutBreaksInput = {
    create?: XOR<AttendanceCreateWithoutBreaksInput, AttendanceUncheckedCreateWithoutBreaksInput>
    connectOrCreate?: AttendanceCreateOrConnectWithoutBreaksInput
    connect?: AttendanceWhereUniqueInput
  }

  export type AttendanceUpdateOneRequiredWithoutBreaksNestedInput = {
    create?: XOR<AttendanceCreateWithoutBreaksInput, AttendanceUncheckedCreateWithoutBreaksInput>
    connectOrCreate?: AttendanceCreateOrConnectWithoutBreaksInput
    upsert?: AttendanceUpsertWithoutBreaksInput
    connect?: AttendanceWhereUniqueInput
    update?: XOR<XOR<AttendanceUpdateToOneWithWhereWithoutBreaksInput, AttendanceUpdateWithoutBreaksInput>, AttendanceUncheckedUpdateWithoutBreaksInput>
  }

  export type EmployeeCreateNestedOneWithoutTrackingInput = {
    create?: XOR<EmployeeCreateWithoutTrackingInput, EmployeeUncheckedCreateWithoutTrackingInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutTrackingInput
    connect?: EmployeeWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EmployeeUpdateOneRequiredWithoutTrackingNestedInput = {
    create?: XOR<EmployeeCreateWithoutTrackingInput, EmployeeUncheckedCreateWithoutTrackingInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutTrackingInput
    upsert?: EmployeeUpsertWithoutTrackingInput
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutTrackingInput, EmployeeUpdateWithoutTrackingInput>, EmployeeUncheckedUpdateWithoutTrackingInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type SiteCreateWithoutEmployeesInput = {
    id?: string
    name: string
    location: string
    latitude?: number | null
    longitude?: number | null
    managerName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SiteUncheckedCreateWithoutEmployeesInput = {
    id?: string
    name: string
    location: string
    latitude?: number | null
    longitude?: number | null
    managerName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SiteCreateOrConnectWithoutEmployeesInput = {
    where: SiteWhereUniqueInput
    create: XOR<SiteCreateWithoutEmployeesInput, SiteUncheckedCreateWithoutEmployeesInput>
  }

  export type AttendanceCreateWithoutEmployeeInput = {
    id?: string
    date?: Date | string
    clockIn?: Date | string
    clockOut?: Date | string | null
    clockInLat?: number | null
    clockInLong?: number | null
    clockOutLat?: number | null
    clockOutLong?: number | null
    biometricProof?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    breaks?: BreakCreateNestedManyWithoutAttendanceInput
  }

  export type AttendanceUncheckedCreateWithoutEmployeeInput = {
    id?: string
    date?: Date | string
    clockIn?: Date | string
    clockOut?: Date | string | null
    clockInLat?: number | null
    clockInLong?: number | null
    clockOutLat?: number | null
    clockOutLong?: number | null
    biometricProof?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    breaks?: BreakUncheckedCreateNestedManyWithoutAttendanceInput
  }

  export type AttendanceCreateOrConnectWithoutEmployeeInput = {
    where: AttendanceWhereUniqueInput
    create: XOR<AttendanceCreateWithoutEmployeeInput, AttendanceUncheckedCreateWithoutEmployeeInput>
  }

  export type AttendanceCreateManyEmployeeInputEnvelope = {
    data: AttendanceCreateManyEmployeeInput | AttendanceCreateManyEmployeeInput[]
  }

  export type TrackingCreateWithoutEmployeeInput = {
    id?: string
    latitude: number
    longitude: number
    timestamp?: Date | string
  }

  export type TrackingUncheckedCreateWithoutEmployeeInput = {
    id?: string
    latitude: number
    longitude: number
    timestamp?: Date | string
  }

  export type TrackingCreateOrConnectWithoutEmployeeInput = {
    where: TrackingWhereUniqueInput
    create: XOR<TrackingCreateWithoutEmployeeInput, TrackingUncheckedCreateWithoutEmployeeInput>
  }

  export type TrackingCreateManyEmployeeInputEnvelope = {
    data: TrackingCreateManyEmployeeInput | TrackingCreateManyEmployeeInput[]
  }

  export type SiteUpsertWithoutEmployeesInput = {
    update: XOR<SiteUpdateWithoutEmployeesInput, SiteUncheckedUpdateWithoutEmployeesInput>
    create: XOR<SiteCreateWithoutEmployeesInput, SiteUncheckedCreateWithoutEmployeesInput>
    where?: SiteWhereInput
  }

  export type SiteUpdateToOneWithWhereWithoutEmployeesInput = {
    where?: SiteWhereInput
    data: XOR<SiteUpdateWithoutEmployeesInput, SiteUncheckedUpdateWithoutEmployeesInput>
  }

  export type SiteUpdateWithoutEmployeesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    managerName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiteUncheckedUpdateWithoutEmployeesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    managerName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceUpsertWithWhereUniqueWithoutEmployeeInput = {
    where: AttendanceWhereUniqueInput
    update: XOR<AttendanceUpdateWithoutEmployeeInput, AttendanceUncheckedUpdateWithoutEmployeeInput>
    create: XOR<AttendanceCreateWithoutEmployeeInput, AttendanceUncheckedCreateWithoutEmployeeInput>
  }

  export type AttendanceUpdateWithWhereUniqueWithoutEmployeeInput = {
    where: AttendanceWhereUniqueInput
    data: XOR<AttendanceUpdateWithoutEmployeeInput, AttendanceUncheckedUpdateWithoutEmployeeInput>
  }

  export type AttendanceUpdateManyWithWhereWithoutEmployeeInput = {
    where: AttendanceScalarWhereInput
    data: XOR<AttendanceUpdateManyMutationInput, AttendanceUncheckedUpdateManyWithoutEmployeeInput>
  }

  export type AttendanceScalarWhereInput = {
    AND?: AttendanceScalarWhereInput | AttendanceScalarWhereInput[]
    OR?: AttendanceScalarWhereInput[]
    NOT?: AttendanceScalarWhereInput | AttendanceScalarWhereInput[]
    id?: StringFilter<"Attendance"> | string
    employeeId?: StringFilter<"Attendance"> | string
    date?: DateTimeFilter<"Attendance"> | Date | string
    clockIn?: DateTimeFilter<"Attendance"> | Date | string
    clockOut?: DateTimeNullableFilter<"Attendance"> | Date | string | null
    clockInLat?: FloatNullableFilter<"Attendance"> | number | null
    clockInLong?: FloatNullableFilter<"Attendance"> | number | null
    clockOutLat?: FloatNullableFilter<"Attendance"> | number | null
    clockOutLong?: FloatNullableFilter<"Attendance"> | number | null
    biometricProof?: StringNullableFilter<"Attendance"> | string | null
    status?: StringFilter<"Attendance"> | string
    createdAt?: DateTimeFilter<"Attendance"> | Date | string
    updatedAt?: DateTimeFilter<"Attendance"> | Date | string
  }

  export type TrackingUpsertWithWhereUniqueWithoutEmployeeInput = {
    where: TrackingWhereUniqueInput
    update: XOR<TrackingUpdateWithoutEmployeeInput, TrackingUncheckedUpdateWithoutEmployeeInput>
    create: XOR<TrackingCreateWithoutEmployeeInput, TrackingUncheckedCreateWithoutEmployeeInput>
  }

  export type TrackingUpdateWithWhereUniqueWithoutEmployeeInput = {
    where: TrackingWhereUniqueInput
    data: XOR<TrackingUpdateWithoutEmployeeInput, TrackingUncheckedUpdateWithoutEmployeeInput>
  }

  export type TrackingUpdateManyWithWhereWithoutEmployeeInput = {
    where: TrackingScalarWhereInput
    data: XOR<TrackingUpdateManyMutationInput, TrackingUncheckedUpdateManyWithoutEmployeeInput>
  }

  export type TrackingScalarWhereInput = {
    AND?: TrackingScalarWhereInput | TrackingScalarWhereInput[]
    OR?: TrackingScalarWhereInput[]
    NOT?: TrackingScalarWhereInput | TrackingScalarWhereInput[]
    id?: StringFilter<"Tracking"> | string
    latitude?: FloatFilter<"Tracking"> | number
    longitude?: FloatFilter<"Tracking"> | number
    timestamp?: DateTimeFilter<"Tracking"> | Date | string
    employeeId?: StringFilter<"Tracking"> | string
  }

  export type EmployeeCreateWithoutSiteInput = {
    id?: string
    employeeId: string
    firstName: string
    lastName: string
    email: string
    password: string
    role?: string
    phone?: string | null
    designation?: string | null
    status?: string
    avatar?: string | null
    isBiometricEnrolled?: boolean
    biometricToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attendance?: AttendanceCreateNestedManyWithoutEmployeeInput
    tracking?: TrackingCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutSiteInput = {
    id?: string
    employeeId: string
    firstName: string
    lastName: string
    email: string
    password: string
    role?: string
    phone?: string | null
    designation?: string | null
    status?: string
    avatar?: string | null
    isBiometricEnrolled?: boolean
    biometricToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attendance?: AttendanceUncheckedCreateNestedManyWithoutEmployeeInput
    tracking?: TrackingUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutSiteInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutSiteInput, EmployeeUncheckedCreateWithoutSiteInput>
  }

  export type EmployeeCreateManySiteInputEnvelope = {
    data: EmployeeCreateManySiteInput | EmployeeCreateManySiteInput[]
  }

  export type EmployeeUpsertWithWhereUniqueWithoutSiteInput = {
    where: EmployeeWhereUniqueInput
    update: XOR<EmployeeUpdateWithoutSiteInput, EmployeeUncheckedUpdateWithoutSiteInput>
    create: XOR<EmployeeCreateWithoutSiteInput, EmployeeUncheckedCreateWithoutSiteInput>
  }

  export type EmployeeUpdateWithWhereUniqueWithoutSiteInput = {
    where: EmployeeWhereUniqueInput
    data: XOR<EmployeeUpdateWithoutSiteInput, EmployeeUncheckedUpdateWithoutSiteInput>
  }

  export type EmployeeUpdateManyWithWhereWithoutSiteInput = {
    where: EmployeeScalarWhereInput
    data: XOR<EmployeeUpdateManyMutationInput, EmployeeUncheckedUpdateManyWithoutSiteInput>
  }

  export type EmployeeScalarWhereInput = {
    AND?: EmployeeScalarWhereInput | EmployeeScalarWhereInput[]
    OR?: EmployeeScalarWhereInput[]
    NOT?: EmployeeScalarWhereInput | EmployeeScalarWhereInput[]
    id?: StringFilter<"Employee"> | string
    employeeId?: StringFilter<"Employee"> | string
    firstName?: StringFilter<"Employee"> | string
    lastName?: StringFilter<"Employee"> | string
    email?: StringFilter<"Employee"> | string
    password?: StringFilter<"Employee"> | string
    role?: StringFilter<"Employee"> | string
    phone?: StringNullableFilter<"Employee"> | string | null
    designation?: StringNullableFilter<"Employee"> | string | null
    status?: StringFilter<"Employee"> | string
    avatar?: StringNullableFilter<"Employee"> | string | null
    siteId?: StringNullableFilter<"Employee"> | string | null
    isBiometricEnrolled?: BoolFilter<"Employee"> | boolean
    biometricToken?: StringNullableFilter<"Employee"> | string | null
    createdAt?: DateTimeFilter<"Employee"> | Date | string
    updatedAt?: DateTimeFilter<"Employee"> | Date | string
  }

  export type EmployeeCreateWithoutAttendanceInput = {
    id?: string
    employeeId: string
    firstName: string
    lastName: string
    email: string
    password: string
    role?: string
    phone?: string | null
    designation?: string | null
    status?: string
    avatar?: string | null
    isBiometricEnrolled?: boolean
    biometricToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    site?: SiteCreateNestedOneWithoutEmployeesInput
    tracking?: TrackingCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutAttendanceInput = {
    id?: string
    employeeId: string
    firstName: string
    lastName: string
    email: string
    password: string
    role?: string
    phone?: string | null
    designation?: string | null
    status?: string
    avatar?: string | null
    siteId?: string | null
    isBiometricEnrolled?: boolean
    biometricToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tracking?: TrackingUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutAttendanceInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutAttendanceInput, EmployeeUncheckedCreateWithoutAttendanceInput>
  }

  export type BreakCreateWithoutAttendanceInput = {
    id?: string
    startTime?: Date | string
    endTime?: Date | string | null
  }

  export type BreakUncheckedCreateWithoutAttendanceInput = {
    id?: string
    startTime?: Date | string
    endTime?: Date | string | null
  }

  export type BreakCreateOrConnectWithoutAttendanceInput = {
    where: BreakWhereUniqueInput
    create: XOR<BreakCreateWithoutAttendanceInput, BreakUncheckedCreateWithoutAttendanceInput>
  }

  export type BreakCreateManyAttendanceInputEnvelope = {
    data: BreakCreateManyAttendanceInput | BreakCreateManyAttendanceInput[]
  }

  export type EmployeeUpsertWithoutAttendanceInput = {
    update: XOR<EmployeeUpdateWithoutAttendanceInput, EmployeeUncheckedUpdateWithoutAttendanceInput>
    create: XOR<EmployeeCreateWithoutAttendanceInput, EmployeeUncheckedCreateWithoutAttendanceInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutAttendanceInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutAttendanceInput, EmployeeUncheckedUpdateWithoutAttendanceInput>
  }

  export type EmployeeUpdateWithoutAttendanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    isBiometricEnrolled?: BoolFieldUpdateOperationsInput | boolean
    biometricToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    site?: SiteUpdateOneWithoutEmployeesNestedInput
    tracking?: TrackingUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutAttendanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    siteId?: NullableStringFieldUpdateOperationsInput | string | null
    isBiometricEnrolled?: BoolFieldUpdateOperationsInput | boolean
    biometricToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tracking?: TrackingUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type BreakUpsertWithWhereUniqueWithoutAttendanceInput = {
    where: BreakWhereUniqueInput
    update: XOR<BreakUpdateWithoutAttendanceInput, BreakUncheckedUpdateWithoutAttendanceInput>
    create: XOR<BreakCreateWithoutAttendanceInput, BreakUncheckedCreateWithoutAttendanceInput>
  }

  export type BreakUpdateWithWhereUniqueWithoutAttendanceInput = {
    where: BreakWhereUniqueInput
    data: XOR<BreakUpdateWithoutAttendanceInput, BreakUncheckedUpdateWithoutAttendanceInput>
  }

  export type BreakUpdateManyWithWhereWithoutAttendanceInput = {
    where: BreakScalarWhereInput
    data: XOR<BreakUpdateManyMutationInput, BreakUncheckedUpdateManyWithoutAttendanceInput>
  }

  export type BreakScalarWhereInput = {
    AND?: BreakScalarWhereInput | BreakScalarWhereInput[]
    OR?: BreakScalarWhereInput[]
    NOT?: BreakScalarWhereInput | BreakScalarWhereInput[]
    id?: StringFilter<"Break"> | string
    startTime?: DateTimeFilter<"Break"> | Date | string
    endTime?: DateTimeNullableFilter<"Break"> | Date | string | null
    attendanceId?: StringFilter<"Break"> | string
  }

  export type AttendanceCreateWithoutBreaksInput = {
    id?: string
    date?: Date | string
    clockIn?: Date | string
    clockOut?: Date | string | null
    clockInLat?: number | null
    clockInLong?: number | null
    clockOutLat?: number | null
    clockOutLong?: number | null
    biometricProof?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    employee: EmployeeCreateNestedOneWithoutAttendanceInput
  }

  export type AttendanceUncheckedCreateWithoutBreaksInput = {
    id?: string
    employeeId: string
    date?: Date | string
    clockIn?: Date | string
    clockOut?: Date | string | null
    clockInLat?: number | null
    clockInLong?: number | null
    clockOutLat?: number | null
    clockOutLong?: number | null
    biometricProof?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AttendanceCreateOrConnectWithoutBreaksInput = {
    where: AttendanceWhereUniqueInput
    create: XOR<AttendanceCreateWithoutBreaksInput, AttendanceUncheckedCreateWithoutBreaksInput>
  }

  export type AttendanceUpsertWithoutBreaksInput = {
    update: XOR<AttendanceUpdateWithoutBreaksInput, AttendanceUncheckedUpdateWithoutBreaksInput>
    create: XOR<AttendanceCreateWithoutBreaksInput, AttendanceUncheckedCreateWithoutBreaksInput>
    where?: AttendanceWhereInput
  }

  export type AttendanceUpdateToOneWithWhereWithoutBreaksInput = {
    where?: AttendanceWhereInput
    data: XOR<AttendanceUpdateWithoutBreaksInput, AttendanceUncheckedUpdateWithoutBreaksInput>
  }

  export type AttendanceUpdateWithoutBreaksInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    clockIn?: DateTimeFieldUpdateOperationsInput | Date | string
    clockOut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clockInLat?: NullableFloatFieldUpdateOperationsInput | number | null
    clockInLong?: NullableFloatFieldUpdateOperationsInput | number | null
    clockOutLat?: NullableFloatFieldUpdateOperationsInput | number | null
    clockOutLong?: NullableFloatFieldUpdateOperationsInput | number | null
    biometricProof?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employee?: EmployeeUpdateOneRequiredWithoutAttendanceNestedInput
  }

  export type AttendanceUncheckedUpdateWithoutBreaksInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    clockIn?: DateTimeFieldUpdateOperationsInput | Date | string
    clockOut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clockInLat?: NullableFloatFieldUpdateOperationsInput | number | null
    clockInLong?: NullableFloatFieldUpdateOperationsInput | number | null
    clockOutLat?: NullableFloatFieldUpdateOperationsInput | number | null
    clockOutLong?: NullableFloatFieldUpdateOperationsInput | number | null
    biometricProof?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeCreateWithoutTrackingInput = {
    id?: string
    employeeId: string
    firstName: string
    lastName: string
    email: string
    password: string
    role?: string
    phone?: string | null
    designation?: string | null
    status?: string
    avatar?: string | null
    isBiometricEnrolled?: boolean
    biometricToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    site?: SiteCreateNestedOneWithoutEmployeesInput
    attendance?: AttendanceCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutTrackingInput = {
    id?: string
    employeeId: string
    firstName: string
    lastName: string
    email: string
    password: string
    role?: string
    phone?: string | null
    designation?: string | null
    status?: string
    avatar?: string | null
    siteId?: string | null
    isBiometricEnrolled?: boolean
    biometricToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attendance?: AttendanceUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutTrackingInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutTrackingInput, EmployeeUncheckedCreateWithoutTrackingInput>
  }

  export type EmployeeUpsertWithoutTrackingInput = {
    update: XOR<EmployeeUpdateWithoutTrackingInput, EmployeeUncheckedUpdateWithoutTrackingInput>
    create: XOR<EmployeeCreateWithoutTrackingInput, EmployeeUncheckedCreateWithoutTrackingInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutTrackingInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutTrackingInput, EmployeeUncheckedUpdateWithoutTrackingInput>
  }

  export type EmployeeUpdateWithoutTrackingInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    isBiometricEnrolled?: BoolFieldUpdateOperationsInput | boolean
    biometricToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    site?: SiteUpdateOneWithoutEmployeesNestedInput
    attendance?: AttendanceUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutTrackingInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    siteId?: NullableStringFieldUpdateOperationsInput | string | null
    isBiometricEnrolled?: BoolFieldUpdateOperationsInput | boolean
    biometricToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendance?: AttendanceUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type AttendanceCreateManyEmployeeInput = {
    id?: string
    date?: Date | string
    clockIn?: Date | string
    clockOut?: Date | string | null
    clockInLat?: number | null
    clockInLong?: number | null
    clockOutLat?: number | null
    clockOutLong?: number | null
    biometricProof?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TrackingCreateManyEmployeeInput = {
    id?: string
    latitude: number
    longitude: number
    timestamp?: Date | string
  }

  export type AttendanceUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    clockIn?: DateTimeFieldUpdateOperationsInput | Date | string
    clockOut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clockInLat?: NullableFloatFieldUpdateOperationsInput | number | null
    clockInLong?: NullableFloatFieldUpdateOperationsInput | number | null
    clockOutLat?: NullableFloatFieldUpdateOperationsInput | number | null
    clockOutLong?: NullableFloatFieldUpdateOperationsInput | number | null
    biometricProof?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    breaks?: BreakUpdateManyWithoutAttendanceNestedInput
  }

  export type AttendanceUncheckedUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    clockIn?: DateTimeFieldUpdateOperationsInput | Date | string
    clockOut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clockInLat?: NullableFloatFieldUpdateOperationsInput | number | null
    clockInLong?: NullableFloatFieldUpdateOperationsInput | number | null
    clockOutLat?: NullableFloatFieldUpdateOperationsInput | number | null
    clockOutLong?: NullableFloatFieldUpdateOperationsInput | number | null
    biometricProof?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    breaks?: BreakUncheckedUpdateManyWithoutAttendanceNestedInput
  }

  export type AttendanceUncheckedUpdateManyWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    clockIn?: DateTimeFieldUpdateOperationsInput | Date | string
    clockOut?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    clockInLat?: NullableFloatFieldUpdateOperationsInput | number | null
    clockInLong?: NullableFloatFieldUpdateOperationsInput | number | null
    clockOutLat?: NullableFloatFieldUpdateOperationsInput | number | null
    clockOutLong?: NullableFloatFieldUpdateOperationsInput | number | null
    biometricProof?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrackingUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrackingUncheckedUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrackingUncheckedUpdateManyWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeCreateManySiteInput = {
    id?: string
    employeeId: string
    firstName: string
    lastName: string
    email: string
    password: string
    role?: string
    phone?: string | null
    designation?: string | null
    status?: string
    avatar?: string | null
    isBiometricEnrolled?: boolean
    biometricToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployeeUpdateWithoutSiteInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    isBiometricEnrolled?: BoolFieldUpdateOperationsInput | boolean
    biometricToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendance?: AttendanceUpdateManyWithoutEmployeeNestedInput
    tracking?: TrackingUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutSiteInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    isBiometricEnrolled?: BoolFieldUpdateOperationsInput | boolean
    biometricToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendance?: AttendanceUncheckedUpdateManyWithoutEmployeeNestedInput
    tracking?: TrackingUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateManyWithoutSiteInput = {
    id?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    isBiometricEnrolled?: BoolFieldUpdateOperationsInput | boolean
    biometricToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BreakCreateManyAttendanceInput = {
    id?: string
    startTime?: Date | string
    endTime?: Date | string | null
  }

  export type BreakUpdateWithoutAttendanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BreakUncheckedUpdateWithoutAttendanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BreakUncheckedUpdateManyWithoutAttendanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use EmployeeCountOutputTypeDefaultArgs instead
     */
    export type EmployeeCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EmployeeCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SiteCountOutputTypeDefaultArgs instead
     */
    export type SiteCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SiteCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AttendanceCountOutputTypeDefaultArgs instead
     */
    export type AttendanceCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AttendanceCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EmployeeDefaultArgs instead
     */
    export type EmployeeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EmployeeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SiteDefaultArgs instead
     */
    export type SiteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SiteDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AttendanceDefaultArgs instead
     */
    export type AttendanceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AttendanceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BreakDefaultArgs instead
     */
    export type BreakArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BreakDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TrackingDefaultArgs instead
     */
    export type TrackingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TrackingDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SecurityAlertDefaultArgs instead
     */
    export type SecurityAlertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SecurityAlertDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}