# Form Data Http POST Action

This action used to post form-data and/or upload file from repository

## Inputs

|Input|Required|Description|Example
|---|---|---|---|
|url|Yes|HTTP Endpoint|`'www.example.com'`
|headers|No|Addition Headers|`'{"x-api-key": "123456"}'`
|data|No|Form Data|`'{"key": "value"}'`
|name|No|File Name|`'config'`
|file|No|File Path|`'assets/config.json'`

## Example Usage

### Send HTTP POST with Form-Data

```yaml
- name: Send HTTP Form-Data POST Request
  uses: alikamal1/Form_Data_HTTP_POST_Action@main
  with:
    url: 'https://example.com'
    data: '{"key_1": "value_1", "key_2": "value_2"}'
```

### Upload File

```yaml
- name: Send HTTP Form-Data POST Request
  uses: alikamal1/Form_Data_HTTP_POST_Action@main
  with:
    url: 'https://example.com'
    name: 'config'
    file: 'assets/config.json'
```

### Send HTTP POST with Form-Data and Upload File with Headers

```yaml
- name: Send HTTP Form-Data POST Request
  uses: alikamal1/Form_Data_HTTP_POST_Action@main
  with:
    url: 'https://example.com'
    headers: '{"x-api-key": "123456"}'
    data: '{"key_1": "value_1", "key_2": "value_2"}'
    name: 'config'
    file: 'assets/config.json'
```
