/**
 * Kept so `@/components/home` and the `./Reveal` imports across the home
 * sections keep resolving. The implementation moved to `@/components/motion`
 * when the site grew a motion layer (lessons.md D-017); import from there in
 * new code.
 */
export { Reveal, type RevealProps } from "@/components/motion";
