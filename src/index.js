import { Season } from "./season";

exports.getReflectionColor = (expression, config) => Season.getReflectionColor(expression, config);
exports.reflectToElement = (element, properties, config) => Season.reflectToElement(element, properties, config);
exports.reflectToPage = (properties, config, ignore) => Season.reflectToPage(properties, config, ignore);