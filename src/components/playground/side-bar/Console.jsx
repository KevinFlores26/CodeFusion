import ConsoleSummary from '@components/playground/templates/ConsoleSummary'
import ConsoleOutput from '@components/playground/templates/ConsoleOutput'
import { BiInfoCircle, BiCircle, BiError, BiXCircle } from 'react-icons/bi'
import { useMemo } from 'react'

export default function Console() {
  const OUTPUT_TYPES = useMemo(
    () => ({
      info: {
        name: 'Info',
        icon: <BiInfoCircle className='ConsoleContent-icon' fill='var(--hex-pr-infoColor)' />,
      },
      log: {
        name: 'Log',
        icon: <BiCircle className='ConsoleContent-icon' fill='var(--hex-pr-logColor)' />,
      },
      warning: {
        name: 'Warning',
        icon: <BiError className='ConsoleContent-icon' fill='var(--hex-pr-warningColor)' />,
      },
      error: {
        name: 'Error',
        icon: <BiXCircle className='ConsoleContent-icon' fill='var(--hex-pr-errorColor)' />,
      },
    }),
    [],
  )

  return (
    <>
      <div className='SideContent-header'>
        <h2>Console</h2>
        <p className='SideContent-description u-small-text'>
          <strong className='SideContent-strong'>Here you can see the console output.</strong>
          <br />
          Console methods and the most common warnings and errors/exceptions are supported.
          <br />
          <small className='SideContent-small'>
            If some unknown error occurs, please also check the browser console.
          </small>
        </p>
      </div>

      <div className='SideContent-body ConsoleContent'>
        {/* temp: console output - template */}
        <ul className='ConsoleContent-summary ConsoleSummary'>
          <ConsoleSummary icon={OUTPUT_TYPES.info.icon} type={OUTPUT_TYPES.info.name.toLowerCase()} count={1} />
          <ConsoleSummary icon={OUTPUT_TYPES.log.icon} type={OUTPUT_TYPES.log.name.toLowerCase()} count={2} />
          <ConsoleSummary icon={OUTPUT_TYPES.warning.icon} type={OUTPUT_TYPES.warning.name.toLowerCase()} count={1} />
          <ConsoleSummary icon={OUTPUT_TYPES.error.icon} type={OUTPUT_TYPES.error.name.toLowerCase()} count={2} />
        </ul>

        <ul className='ConsoleContent-output ConsoleOutput'>
          <ConsoleOutput
            icon={OUTPUT_TYPES.info.icon}
            type={OUTPUT_TYPES.info.name.toLocaleLowerCase()}
            message='Logged in!'
          />
          <ConsoleOutput
            icon={OUTPUT_TYPES.log.icon}
            type={OUTPUT_TYPES.log.name.toLocaleLowerCase()}
            message='Hello, World!'
          />
          <ConsoleOutput
            icon={OUTPUT_TYPES.warning.icon}
            type={OUTPUT_TYPES.warning.name.toLocaleLowerCase()}
            message='Another session!Another session!Another session!Another session!'
          />
          <ConsoleOutput
            icon={OUTPUT_TYPES.error.icon}
            type={OUTPUT_TYPES.error.name.toLocaleLowerCase()}
            message='Bad password!'
          />
          <ConsoleOutput
            icon={OUTPUT_TYPES.error.icon}
            type={OUTPUT_TYPES.error.name.toLocaleLowerCase()}
            message='Bad password!'
          />
          <ConsoleOutput
            icon={OUTPUT_TYPES.error.icon}
            type={OUTPUT_TYPES.error.name.toLocaleLowerCase()}
            message='Bad password!'
          />
        </ul>
      </div>
    </>
  )
}
