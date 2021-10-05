# Logview Export

## Environment
```shell
##Logview export directory, this directory will be created under /public
LOGVIEW_EXPORT_DIRECTORY=/exports
## Export expiry, 7 days after successful export
LOGVIEW_EXPORT_EXPIRY="+7 days"
# To prevent memory issue we split huge export data in to many small packet
# every packet have maximum 24 hours in query filter and you can change it here
# by this, if you export 30 days data, it will split to 30 packet
LOGVIEW_EXPORT_MAX_RANGE=24
```

## Export data
`php bin/console logview:export-data`
```shell
Description:
  Export Logview Data

Usage:
  logview:export-data [options]

Options:
  -l, --limit[=LIMIT]   Limit num of exports to process per time. Default: 1
  -h, --help            Display help for the given command. When no command is given display help for the list command
```

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

## Delete Exports
`php bin/console logview:export-delete`

```shell
Description:
  Delete the logview export.

Usage:
  logview:export-delete [options]

Options:
  -i, --id=ID           Id of the export
  -u, --user=USER       User's ID or Email. Delete all the exports of an user
      --all             Delete all the exports
  -h, --help            Display help for the given command. When no command is given display help for the list command
  -q, --quiet           Do not output any message
```

**Ex**:
- `php bin/console logview:export-delete --id=10`
- `php bin/console logview:export-delete --user=user@example.com`
- `php bin/console logview:export-delete --all`
