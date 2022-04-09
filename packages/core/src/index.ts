import axios from "axios";
import { O } from "ts-toolbelt";

interface SchemaProperty {
  type: string;
  description?: string;
  example?: string;
}

interface Schema {
  title: string;
  type: "object";
  properties: O.Record<string, SchemaProperty>;
}

interface SchemaRef {
  $ref: string;
}

interface MetaType {
  schema: SchemaRef;
}

interface Content {
  "*/*": MetaType;
  "application/json": MetaType;
}

interface RequestBody {
  content: Content;
}

interface Responses {
  "200": {
    description: string;
    content: Content;
  };
}

interface RequestMethod {
  tags: string[];
  summary: string;
  operationId: string;
  requestBody?: RequestBody;
  responses: Responses;
}

interface OAS3 {
  paths: O.Record<"post" | "get" | "put" | "delete", RequestMethod, ["?", "R"]>;
  components: {
    schemas: O.Record<string, Schema>;
  };
}

interface IResponse {
  data: OAS3;
}

const res = await axios.get<any, IResponse>(
  "http://pos-api.vzpos.com/v3/api-docs"
);

console.log(res.data);

const { paths } = res.data;
