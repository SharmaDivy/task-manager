function KanbanSvg(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="40px"
      viewBox="0 -960 960 960"
      width="40px"
      fill="#1f1f1f"
      {...props}
    >
      <path d="M279.33-278H346v-404h-66.67v404ZM614-358h66.67v-324H614v324ZM446.67-478h66.66v-204h-66.66v204Zm-260 358q-27 0-46.84-19.83Q120-159.67 120-186.67v-586.66q0-27 19.83-46.84Q159.67-840 186.67-840h586.66q27 0 46.84 19.83Q840-800.33 840-773.33v586.66q0 27-19.83 46.84Q800.33-120 773.33-120H186.67Zm0-66.67h586.66v-586.66H186.67v586.66Zm0-586.66v586.66-586.66Z" />
    </svg>
  );
}
export default function KanbanLogo() {
  return (
    <div className="flex items-center gap-3 font-extrabold text-white text-3xl p-6">
      <KanbanSvg className="fill-theme" />
      kanban
    </div>
  );
}
