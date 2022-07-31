<script>
  export let title = "States Ranked";
</script>

<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width" />
  <link rel="icon" type="image/png" href="/states-ranked/favicon-32x32.png" />
  <title>{title}</title>
</head>
<body class="bg-slate-900 text-gray-100">
  <main>
    <div class="mx-auto max-w-screen-lg px-3 py-6">
      <div class="flex flex-col gap-y-3 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-center bg-gradient-to-br from-sky-500 to-cyan-400 bg-clip-text text-4xl font-bold text-transparent">
          States Ranked
        </div>
      </div>
    </div>
    <div class="mx-auto max-w-screen-lg px-3 py-6">
      <slot />
    </div>
  </main>
</body>
</html>
