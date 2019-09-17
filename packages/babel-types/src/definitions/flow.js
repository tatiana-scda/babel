// @flow
import defineType, {
  arrayOfType,
  assertOneOf,
  assertValueType,
  validate,
  validateOptional,
  validateOptionalType,
  validateType,
} from "./utils";

defineType("AnyTypeAnnotation", {
  aliases: ["Flow", "FlowType", "FlowBaseAnnotation"],
});

defineType("ArrayTypeAnnotation", {
  visitor: ["elementType"],
  aliases: ["Flow", "FlowType"],
  fields: {
    elementType: validateType("FlowType"),
  },
});

defineType("BooleanTypeAnnotation", {
  aliases: ["Flow", "FlowType", "FlowBaseAnnotation"],
});

defineType("BooleanLiteralTypeAnnotation", {
  builder: ["value"],
  aliases: ["Flow", "FlowType"],
  fields: {
    value: validate(assertValueType("boolean")),
  },
});

defineType("NullLiteralTypeAnnotation", {
  aliases: ["Flow", "FlowType", "FlowBaseAnnotation"],
});

defineInterfaceishType("DeclareClass");

defineType("DeclareFunction", {
  visitor: ["id"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {
    id: validateType("Identifier"),
    predicate: validateOptionalType("DeclaredPredicate"),
  },
});

defineInterfaceishType("DeclareInterface");

defineType("DeclareModule", {
  builder: ["id", "body", "kind"],
  visitor: ["id", "body"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {
    id: validateType(["Identifier", "StringLiteral"]),
    body: validateType("BlockStatement"),
    kind: validateOptional(assertOneOf("CommonJS", "ES")),
  },
});

defineType("DeclareModuleExports", {
  visitor: ["typeAnnotation"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {
    typeAnnotation: validateType("TypeAnnotation"),
  },
});



defineType("DeclareVariable", {
  visitor: ["id"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {
    id: validateType("Identifier"),
  },
});

defineType("DeclareExportDeclaration", {
  visitor: ["declaration", "specifiers", "source"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {
    declaration: validateOptionalType("Flow"),
    specifiers: validateOptional(
      arrayOfType(["ExportSpecifier", "ExportNamespaceSpecifier"]),
    ),
    source: validateOptionalType("StringLiteral"),
    default: validateOptional(assertValueType("boolean")),
  },
});

defineType("DeclareExportAllDeclaration", {
  visitor: ["source"],
  aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
  fields: {
    source: validateType("StringLiteral"),
    exportKind: validateOptional(assertOneOf("type", "value")),
  },
});

defineType("DeclaredPredicate", {
  visitor: ["value"],
  aliases: ["Flow", "FlowPredicate"],
  fields: {
    value: validateType("Flow"),
  },
});

defineType("ExistsTypeAnnotation", {
  aliases: ["Flow", "FlowType"],
});


defineType("InferredPredicate", {
  aliases: ["Flow", "FlowPredicate"],
});


defineInterfaceishType("InterfaceDeclaration");

defineType("InterfaceTypeAnnotation", {
  visitor: ["extends", "body"],
  aliases: ["Flow", "FlowType"],
  fields: {
    extends: validateOptional(arrayOfType("InterfaceExtends")),
    body: validateType("ObjectTypeAnnotation"),
  },
});

defineType("IntersectionTypeAnnotation", {
  visitor: ["types"],
  aliases: ["Flow", "FlowType"],
  fields: {
    types: validate(arrayOfType("FlowType")),
  },
});

defineType("MixedTypeAnnotation", {
  aliases: ["Flow", "FlowType", "FlowBaseAnnotation"],
});

defineType("EmptyTypeAnnotation", {
  aliases: ["Flow", "FlowType", "FlowBaseAnnotation"],
});

defineType("NullableTypeAnnotation", {
  visitor: ["typeAnnotation"],
  aliases: ["Flow", "FlowType"],
  fields: {
    typeAnnotation: validateType("FlowType"),
  },
});

defineType("NumberLiteralTypeAnnotation", {
  builder: ["value"],
  aliases: ["Flow", "FlowType"],
  fields: {
    value: validate(assertValueType("number")),
  },
});

defineType("NumberTypeAnnotation", {
  aliases: ["Flow", "FlowType", "FlowBaseAnnotation"],
});

defineType("ObjectTypeAnnotation", {
  visitor: ["properties", "indexers", "callProperties", "internalSlots"],
  aliases: ["Flow", "FlowType"],
  builder: [
    "properties",
    "indexers",
    "callProperties",
    "internalSlots",
    "exact",
  ],
  fields: {
    properties: validate(
      arrayOfType(["ObjectTypeProperty", "ObjectTypeSpreadProperty"]),
    ),
    indexers: validateOptional(arrayOfType("ObjectTypeIndexer")),
    callProperties: validateOptional(arrayOfType("ObjectTypeCallProperty")),
    internalSlots: validateOptional(arrayOfType("ObjectTypeInternalSlot")),
    exact: {
      validate: assertValueType("boolean"),
      default: false,
    },
    // If the inexact flag is present then this is an object type, and not a
    // declare class, declare interface, or interface. If it is true, the
    // object uses ... to express that it is inexact.
    inexact: validateOptional(assertValueType("boolean")),
  },
});

defineType("ObjectTypeInternalSlot", {
  visitor: ["id", "value", "optional", "static", "method"],
  aliases: ["Flow", "UserWhitespacable"],
  fields: {
    id: validateType("Identifier"),
    value: validateType("FlowType"),
    optional: validate(assertValueType("boolean")),
    static: validate(assertValueType("boolean")),
    method: validate(assertValueType("boolean")),
  },
});

defineType("ObjectTypeCallProperty", {
  visitor: ["value"],
  aliases: ["Flow", "UserWhitespacable"],
  fields: {
    value: validateType("FlowType"),
    static: validate(assertValueType("boolean")),
  },
});

defineType("ObjectTypeIndexer", {
  visitor: ["id", "key", "value", "variance"],
  aliases: ["Flow", "UserWhitespacable"],
  fields: {
    id: validateOptionalType("Identifier"),
    key: validateType("FlowType"),
    value: validateType("FlowType"),
    static: validate(assertValueType("boolean")),
    variance: validateOptionalType("Variance"),
  },
});

defineType("ObjectTypeProperty", {
  visitor: ["key", "value", "variance"],
  aliases: ["Flow", "UserWhitespacable"],
  fields: {
    key: validateType(["Identifier", "StringLiteral"]),
    value: validateType("FlowType"),
    kind: validate(assertOneOf("init", "get", "set")),
    static: validate(assertValueType("boolean")),
    proto: validate(assertValueType("boolean")),
    optional: validate(assertValueType("boolean")),
    variance: validateOptionalType("Variance"),
  },
});

defineType("ObjectTypeSpreadProperty", {
  visitor: ["argument"],
  aliases: ["Flow", "UserWhitespacable"],
  fields: {
    argument: validateType("FlowType"),
  },
});



defineType("QualifiedTypeIdentifier", {
  visitor: ["id", "qualification"],
  aliases: ["Flow"],
  fields: {
    id: validateType("Identifier"),
    qualification: validateType(["Identifier", "QualifiedTypeIdentifier"]),
  },
});

defineType("StringLiteralTypeAnnotation", {
  builder: ["value"],
  aliases: ["Flow", "FlowType"],
  fields: {
    value: validate(assertValueType("string")),
  },
});

defineType("StringTypeAnnotation", {
  aliases: ["Flow", "FlowType", "FlowBaseAnnotation"],
});

defineType("ThisTypeAnnotation", {
  aliases: ["Flow", "FlowType", "FlowBaseAnnotation"],
});

defineType("TupleTypeAnnotation", {
  visitor: ["types"],
  aliases: ["Flow", "FlowType"],
  fields: {
    types: validate(arrayOfType("FlowType")),
  },
});

defineType("TypeofTypeAnnotation", {
  visitor: ["argument"],
  aliases: ["Flow", "FlowType"],
  fields: {
    argument: validateType("FlowType"),
  },
});


defineType("TypeAnnotation", {
  aliases: ["Flow"],
  visitor: ["typeAnnotation"],
  fields: {
    typeAnnotation: validateType("FlowType"),
  },
});

defineType("TypeCastExpression", {
  visitor: ["expression", "typeAnnotation"],
  aliases: ["Flow", "ExpressionWrapper", "Expression"],
  fields: {
    expression: validateType("Expression"),
    typeAnnotation: validateType("TypeAnnotation"),
  },
});

defineType("UnionTypeAnnotation", {
  visitor: ["types"],
  aliases: ["Flow", "FlowType"],
  fields: {
    types: validate(arrayOfType("FlowType")),
  },
});

defineType("Variance", {
  aliases: ["Flow"],
  builder: ["kind"],
  fields: {
    kind: validate(assertOneOf("minus", "plus")),
  },
});

defineType("VoidTypeAnnotation", {
  aliases: ["Flow", "FlowType", "FlowBaseAnnotation"],
});
