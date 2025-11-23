// music/musicRoles.js
export function hasMusicPermissions(member) {
    if (member.permissions.has("Administrator")) return true;

    const djRole = member.guild.roles.cache.find(
        r => r.name.toLowerCase() === "dj"
    );

    return djRole ? member.roles.cache.has(djRole.id) : false;
}
