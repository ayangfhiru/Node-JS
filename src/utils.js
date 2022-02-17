const mapDbToModel = ({
    id,
    title,
    body,
    create_at,
    update_at
}) => ({
    id,
    title,
    body,
    createAt : create_at,
    updateAt : update_at
});

module.exports = mapDbToModel;