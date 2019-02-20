import React from 'react'

export function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return '' // or if (/\s+/.test(match)) for white spaces
    return index == 0 ? match.toLowerCase() : match.toUpperCase()
  })
}

export function commaParse(str) {
  return str.split(', ')
}

export function mapLinks(linkNames, linkUrls) {
  return linkNames.map((name, i) => (
    <a href={linkUrls[i]} target="_blank">
      {name}
    </a>
  ))
}
