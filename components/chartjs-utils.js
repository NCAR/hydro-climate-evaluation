function months(options) {
    const count = options.count || 12;
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return monthNames.slice(0, count);
}
