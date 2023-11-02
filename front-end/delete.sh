# Replace 'your-storage-account' and 'your-container-name' with your values
for blob in $(az storage blob list --account-name fullstackbankingweb --container-name '$web' --output tsv --query '[].name'); do
  az storage blob delete --account-name fullstackbankingweb --container-name '$web' --name $blob
  echo "Deleted blob $blob"
done

