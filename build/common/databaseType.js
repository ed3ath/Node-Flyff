"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseType = void 0;
var DatabaseType;
(function (DatabaseType) {
    DatabaseType["MARIADB"] = "mariadb";
    DatabaseType["MYSQL"] = "mysql";
    DatabaseType["LITE"] = "sqlite";
    DatabaseType["POSTGRES"] = "postgres";
})(DatabaseType || (exports.DatabaseType = DatabaseType = {}));
