export const getColorVote = (vote: number) => {
    let color = "";
    if (vote <= 3) {
        color = "#EF4444";
    } else if (vote > 3 && vote <= 7) {
        color = "#F59E0B";
    } else {
        color = "#10B981";
    }
    return color;
};
