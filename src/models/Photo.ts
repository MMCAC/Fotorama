export type Photo = {
  id: string
  creationDate: Date
  description: string
  creatorName: string
  thumbURL: string
  regularURL: string
}

export const getPhoto = (obj: any) => {
  const { id, created_at, description, user, urls } = obj

  const photo: Photo = {
    //id: id,
    id,
    creationDate: new Date(created_at),
    description,
    creatorName: user.name,
    regularURL: urls.regular,
    thumbURL: urls.thumb,
  }

  return photo
}
