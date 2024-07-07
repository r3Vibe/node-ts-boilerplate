const roles = ['user', 'admin', 'superadmin'];

const roleRights = new Map();
roleRights.set(roles[0], ['profile']);
roleRights.set(roles[1], ['profile', 'admin']);
roleRights.set(roles[2], ['profile', 'admin', 'superadmin']);

export default { roles, roleRights };
