export const GET = async () => {
  // const _payload = await getPayload({
  //   config: configPromise,
  // })

  return Response.json({
    message: 'This is an example of a custom route.',
  })
}
