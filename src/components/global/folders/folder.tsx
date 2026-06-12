'use client'
import { cn } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import Loader from '../loader'
import FolderDuotone from '@/components/icons/folder-duotone'
import { useMutationData, useMutationDataState } from '@/hooks/useMutationData'
import { renameFolders, softDeleteFolder } from '@/actions/workspace'
import { Input } from '@/components/ui/input'
import { Trash2, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import ConfirmDeleteModal from '@/components/global/confirm-delete'

type Props = {
  name: string
  id: string
  optimistic?: boolean
  count?: number
}

const Folder = ({ id, name, optimistic, count }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const folderCardRef = useRef<HTMLDivElement | null>(null)
  const pathName = usePathname()
  const router = useRouter()
  const [onRename, setOnRename] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const Rename = () => setOnRename(true)
  const Renamed = () => setOnRename(false)

  const { mutate, isPending } = useMutationData(
    ['rename-folders'],
    (data: { name: string }) => renameFolders(id, data.name),
    'workspace-folders',
    Renamed
  )

  const { latestVariables } = useMutationDataState(['rename-folders'])

  const handleFolderClick = () => {
    if (onRename) return
    router.push(`${pathName}/folder/${id}`)
  }

  const handleNameDoubleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation()
    Rename()
  }

  const updateFolderName = (e: React.FocusEvent<HTMLInputElement>) => {
    if (inputRef.current) {
      if (inputRef.current.value) {
        mutate({ name: inputRef.current.value, id })
      } else Renamed()
    }
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsConfirmOpen(true)
  }

  const handleConfirmDelete = async () => {
    setIsDeleting(true)
    setIsConfirmOpen(false)
    const res = await softDeleteFolder(id)
    if (res.status === 200) {
      toast.success("Folder moved to Trash")
      router.refresh()
    } else {
      toast.error("Failed to delete folder")
      setIsDeleting(false)
    }
  }

  return (
    <div
      onClick={handleFolderClick}
      ref={folderCardRef}
      className={cn(
        optimistic && 'opacity-60',
        'group flex items-center gap-4 justify-between min-w-[250px] py-3.5 px-4 rounded-xl bg-neutral-900/30 dark:bg-neutral-900/10 hover:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-900 hover:border-neutral-850 cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md'
      )}
    >
      <Loader state={isPending}>
        <div className="flex flex-col gap-0.5">
          {onRename ? (
            <Input
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                updateFolderName(e)
              }}
              autoFocus
              placeholder={name}
              className="border-none text-sm w-full outline-none dark:text-neutral-300 bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              ref={inputRef}
            />
          ) : (
            <p
              onClick={(e) => e.stopPropagation()}
              className="dark:text-neutral-200 text-sm font-semibold hover:text-neutral-100"
              onDoubleClick={handleNameDoubleClick}
            >
              {latestVariables &&
              latestVariables.status === 'pending' &&
              latestVariables.variables.id === id
                ? latestVariables.variables.name
                : name}
            </p>
          )}
          <span className="text-xs text-neutral-500 font-medium">{count || 0} videos</span>
        </div>
      </Loader>
      <div className="flex items-center gap-2">
        {isDeleting ? (
          <Loader2 className="w-4 h-4 animate-spin text-neutral-500" />
        ) : (
          <Trash2 
            onClick={handleDeleteClick}
            className="w-4 h-4 text-neutral-500 hover:text-rose-500 transition-colors md:opacity-0 group-hover:opacity-100"
          />
        )}
        <FolderDuotone />
      </div>

      <ConfirmDeleteModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Move Folder to Trash"
        description={`Are you sure you want to move the folder "${name}" to Trash? You can restore it later from your Trash folder.`}
        loading={isDeleting}
      />
    </div>
  )
}

export default Folder
