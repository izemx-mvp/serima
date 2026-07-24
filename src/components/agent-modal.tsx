import { Link } from "@tanstack/react-router";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

/**
 * Compat shim : les interfaces complètes des agents sont désormais des pages
 * dédiées sous /agents/$id. Ce composant renvoie l'utilisateur vers la page.
 */
export function AgentModal({
  agentId,
  open,
  onOpenChange,
  title,
}: {
  agentId: string | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
  title: string;
}) {
  if (!agentId) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Cet agent dispose désormais d'une interface métier complète et dédiée.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Fermer</Button>
          <Button asChild>
            <Link to="/agents/$id" params={{ id: agentId }}>
              Ouvrir l'interface complète <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
