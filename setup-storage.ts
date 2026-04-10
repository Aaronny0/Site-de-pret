import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing env vars')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupStorage() {
  const bucketName = 'loan-documents'
  console.log('Checking bucket:', bucketName)
  
  const { data: buckets, error: listError } = await supabase.storage.listBuckets()
  if (listError) {
    console.error('Error listing buckets:', listError)
    return
  }

  const exists = buckets.find(b => b.name === bucketName)
  if (!exists) {
    console.log(`Bucket ${bucketName} does not exist. Creating...`)
    const { data, error } = await supabase.storage.createBucket(bucketName, {
      public: false,
      fileSizeLimit: 5242880,
      allowedMimeTypes: ['application/pdf', 'image/jpeg', 'image/png']
    })
    if (error) {
      console.error('Error creating bucket:', error)
    } else {
      console.log('Bucket created successfully:', data)
    }
  } else {
    console.log(`Bucket ${bucketName} already exists.`)
  }
}

setupStorage()
