import React from 'react'

function BlogCard() {
  const date = new Date();
  const content = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos provi loreLorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur eos animi sit rem modi quidem amet soluta vitae! Cupiditate praesentium provident ipsam vel magni non accusantium, voluptate doloremque deserunt culpa, reiciendis veritatis asperiores deleniti. Magnam dolorum incidunt neque libero quidem fuga delectus tempore. Vel laborum quisquam animi autem molestiae incidunt architecto dolores repudiandae, ex ratione porro ipsam illo consequuntur, totam, quasi hic eius. Nihil dignissimos tempora voluptatum error repudiandae, libero at veritatis assumenda dicta sint eligendi est sunt deserunt in ratione reiciendis placeat iure nemo soluta velit accusantium dolorum dolore? Voluptatibus atque, cumque error a ipsa sit, deleniti officiis quas est eligendi exercitationem? Officiis eveniet consectetur sit, natus cum neque quis reiciendis iure illo temporibus esse nobis eius, hic repudiandae, optio ea soluta. Obcaecati accusamus assumenda sed aspernatur aliquam magnam cum quae molestiae quis fugiat, quam, quisquam delectus autem? Provident incidunt nihil cum magnam a iure accusamus consequatur in dolore?"
  return (
    <div className="text-secondary border border-slate-400/20 rounded-lg  mt-4 p-2">
          <div className="flex gap-2 text-xs items-center">
            <div className="flex items-center gap-1">
              <div className="px-2 py-1 bg-border rounded-[50%] flex flex-col justify-center">
                U
              </div>
              <div>User</div>
            </div>
            <div className="h-1 w-1 bg-slate-500 rounded-full"></div>
            <div>
              {`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`}
            </div>
          </div>
          <div className="mt-2 text-xl lg:text-2xl font-bold">
            Title
          </div>
          <div className="text-slate-400/70 lg:text-lg text-base">
            {content.length > 200 ? content.slice(0, 200) + "..." : content}
          </div>
          <div className="text-xs text-slate-500/50 mt-3">
          {`${Math.ceil(content.length / 500)} minute(s) read`}
          </div>
        </div>
  )
}

export default BlogCard