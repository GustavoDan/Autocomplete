export default {
    SELECT: {
        "*, {|COLUNA_TABELAS|}": {
            FROM: {
                "{TABLES}": {},
            },
        },
    },
    INSERT: {
        INTO: {
            "{TABLES}": {
                VALUES: {},
            },
        },
    },
    UPDATE: {
        "{TABLES}": {
            SET: {},
        },
    },
    DELETE: {
        FROM: {
            "{TABLES}": {},
        },
    },
};
