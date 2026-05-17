export default function ProfilePostsSkeleton() {

  return (
    <div
      className="
        grid gap-5
        sm:grid-cols-2
        xl:grid-cols-3
      "
    >

      {[...Array(6)].map(
        (_, index) => (

          <div
            key={index}
            className="
              animate-pulse
              overflow-hidden
              rounded-[32px]
              border border-white/10
              bg-white/[0.04]
              backdrop-blur-xl
            "
          >

            <div
              className="
                aspect-square
                bg-white/10
              "
            />

            <div className="p-5">

              <div
                className="
                  h-4 w-full
                  rounded-lg
                  bg-white/10
                "
              />

              <div
                className="
                  mt-3 h-4
                  w-2/3 rounded-lg
                  bg-white/10
                "
              />

            </div>

          </div>

        )
      )}

    </div>
  );
}