// @parameters
import defineType, {
    arrayOfType,
    assertOneOf,
    assertValueType,
    validate,
    validateOptional,
    validateOptionalType,
    validateType,
  } from "./utils";

const defineParam = (
    name: string,
    typeParameterType: string = "TypeParameterDeclaration",
  ) => {
    defineType(name, {
      builder: ["id", "typeParameters", "extends", "body"],
      visitor: [
        "id",
        "typeParameters",
        "extends",
        "mixins",
        "implements",
        "body",
      ],
      aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
      fields: {
        id: validateType("Identifier"),
        typeParameters: validateOptionalType(typeParameterType),
        extends: validateOptional(arrayOfType("InterfaceExtends")),
        mixins: validateOptional(arrayOfType("InterfaceExtends")),
        implements: validateOptional(arrayOfType("ClassImplements")),
        body: validateType("ObjectTypeAnnotation"),
      },
    });
  };

defineType("TypeParameter", {
    aliases: ["Flow"],
    visitor: ["bound", "default", "variance"],
    fields: {
      name: validate(assertValueType("string")),
      bound: validateOptionalType("TypeAnnotation"),
      default: validateOptionalType("FlowType"),
      variance: validateOptionalType("Variance"),
    },
  });
  
  defineType("TypeParameterDeclaration", {
    aliases: ["Flow"],
    visitor: ["params"],
    fields: {
      params: validate(arrayOfType("TypeParameter")),
    },
  });
  
  defineType("TypeParameterInstantiation", {
    aliases: ["Flow"],
    visitor: ["params"],
    fields: {
      params: validate(arrayOfType("FlowType")),
    },
  });

  defineType("ClassImplements", {
    visitor: ["id", "typeParameters"],
    aliases: ["Flow"],
    fields: {
      id: validateType("Identifier"),
      typeParameters: validateOptionalType("TypeParameterInstantiation"),
    },
  });

  defineType("DeclareTypeAlias", {
    visitor: ["id", "typeParameters", "right"],
    aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
    fields: {
      id: validateType("Identifier"),
      typeParameters: validateOptionalType("TypeParameterDeclaration"),
      right: validateType("FlowType"),
    },
  });
  
  defineType("DeclareOpaqueType", {
    visitor: ["id", "typeParameters", "supertype"],
    aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
    fields: {
      id: validateType("Identifier"),
      typeParameters: validateOptionalType("TypeParameterDeclaration"),
      supertype: validateOptionalType("FlowType"),
    },
  });

  defineType("FunctionTypeAnnotation", {
    visitor: ["typeParameters", "params", "rest", "returnType"],
    aliases: ["Flow", "FlowType"],
    fields: {
      typeParameters: validateOptionalType("TypeParameterDeclaration"),
      params: validate(arrayOfType("FunctionTypeParam")),
      rest: validateOptionalType("FunctionTypeParam"),
      returnType: validateType("FlowType"),
    },
  });
  
  defineType("FunctionTypeParam", {
    visitor: ["name", "typeAnnotation"],
    aliases: ["Flow"],
    fields: {
      name: validateOptionalType("Identifier"),
      typeAnnotation: validateType("FlowType"),
      optional: validateOptional(assertValueType("boolean")),
    },
  });
  
  defineType("GenericTypeAnnotation", {
    visitor: ["id", "typeParameters"],
    aliases: ["Flow", "FlowType"],
    fields: {
      id: validateType(["Identifier", "QualifiedTypeIdentifier"]),
      typeParameters: validateOptionalType("TypeParameterInstantiation"),
    },
  });

  defineType("InterfaceExtends", {
    visitor: ["id", "typeParameters"],
    aliases: ["Flow"],
    fields: {
      id: validateType(["Identifier", "QualifiedTypeIdentifier"]),
      typeParameters: validateOptionalType("TypeParameterInstantiation"),
    },
  });

  defineType("OpaqueType", {
    visitor: ["id", "typeParameters", "supertype", "impltype"],
    aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
    fields: {
      id: validateType("Identifier"),
      typeParameters: validateOptionalType("TypeParameterDeclaration"),
      supertype: validateOptionalType("FlowType"),
      impltype: validateType("FlowType"),
    },
  });

  defineType("TypeAlias", {
    visitor: ["id", "typeParameters", "right"],
    aliases: ["Flow", "FlowDeclaration", "Statement", "Declaration"],
    fields: {
      id: validateType("Identifier"),
      typeParameters: validateOptionalType("TypeParameterDeclaration"),
      right: validateType("FlowType"),
    },
  });