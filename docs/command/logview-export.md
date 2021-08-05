# Logview Export

## Environment
```shell
##Logview export directory, this directory will be created under /public
LOGVIEW_EXPORT_DIRECTORY=/exports
## Export expiry, 7 days after successful export
LOGVIEW_EXPORT_EXPIRY="+7 days"
```

## Export data
`php bin/console logview:export-data`

## Cleanup expired exports
`php bin/console logview:export-cleanup`

```shell
Description:
  Clean up all expired exports

Usage:
  logview:export-cleanup [options]

Options:
  -l, --limit           Limit exports to delete. 0 is unlimited. Default: 0
  -h, --help            Display help for the given command. When no command is given display help for the list command
```
