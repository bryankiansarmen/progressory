import { useInteractionContext } from "@/components/layout/InteractionProvider";

export const useInteraction = useInteractionContext;
export const useConfirm = () => {
    const { confirm } = useInteractionContext();
    return confirm;
};
