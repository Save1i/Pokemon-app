import { Drawer } from "vaul"

interface DetailProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onClose: () => void
}

const Detail = ({ open, onOpenChange, onClose }: DetailProps) => {
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-gray-100 h-fit fixed bottom-0 left-0 right-0 outline-none">
          <div className="p-4 bg-white text-black">
            <p>et consectetur adipisicing elit. Nulla facere veniam provident dignissimos eos quae, perspiciatis sapiente nesciunt, ipsam velit aperiam atque accusantium minus omnis pariatur. Recusandae ad mollitia repellendus distinctio deserunt magni assumenda consequatur ut delectus. Corporis, expedita hic a cumque blanditiis totam! Aspernatur assumenda cum inventore sint. Cumque ipsa hic modi quisquam ratione temporibus soluta corrupti minima consequatur porro doloremque est tempus, odit atque dicta ut unde, quo error et laboriosam quis eveniet? Vero magni iure numquam, hic officia perspiciatis nisi deleniti quibusdam pariatur, atque architecto nemo sunt reiciendis repellendus, sequi exercitationem doloremque ut aliquid provident repellat quam!</p>
            
            
            <button 
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

export default Detail