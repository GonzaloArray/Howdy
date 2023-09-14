import UploadPost from './UploadPost'

export const PublicComment = ({ setModal }) => {
  const handleClick = () => {
    setModal(true)
  }

  return (
    <UploadPost click={handleClick} />
  )
}
