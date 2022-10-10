const driver = process.env.SESSION_DRIVER

if (!driver) {
  throw new Error('Missing env variable "SESSION_DRIVER"')
}

if (!['memory', 'file', 'redis'].includes(driver)) {
  throw new Error('Invalid value for env variable "SESSION_DRIVER"')  
}