const CJK_REGEX =
  /[　-〿぀-ヿ㐀-䶿一-鿿豈-﫿＀-￯가-힯]/;

export const isReadableHint = (text?: string): boolean => {
  const trimmed = text?.trim();
  if (!trimmed || trimmed === "Unknown") return false;
  return !CJK_REGEX.test(trimmed);
};

export const isHaloAvailable = (haloImage?: string): boolean => {
  if (!haloImage) return false;
  return !haloImage.includes("/student/icon/");
};
