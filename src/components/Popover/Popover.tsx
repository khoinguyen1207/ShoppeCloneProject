import React, { useRef, useState } from 'react'
import {
    useFloating,
    arrow,
    FloatingPortal,
    shift,
    offset,
    useHover,
    FloatingArrow,
    useInteractions,
    safePolygon,
    Placement
} from '@floating-ui/react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
    children: React.ReactNode
    renderPopover: React.ReactNode
    className?: string
    setPlacement?: Placement
    crossAxis?: number
}

export default function Popover({ children, renderPopover, className, crossAxis = 0, setPlacement }: Props) {
    const [isOpen, setIsOpen] = useState(false)
    const arrowRef = useRef(null)

    const { refs, x, y, strategy, middlewareData, context } = useFloating({
        placement: setPlacement,
        open: isOpen,
        onOpenChange: setIsOpen,
        middleware: [
            arrow({ element: arrowRef }),
            shift(),
            offset({
                mainAxis: 6,
                crossAxis: crossAxis
            })
        ]
    })

    const hover = useHover(context, {
        handleClose: safePolygon()
    })

    const { getReferenceProps, getFloatingProps } = useInteractions([hover])
    return (
        <div className={className} ref={refs.setReference} {...getReferenceProps()}>
            {children}
            <FloatingPortal>
                {isOpen && (
                    <AnimatePresence>
                        <motion.div
                            ref={refs.setFloating}
                            style={{
                                position: strategy,
                                left: x,
                                top: y,
                                width: 'max-content',
                                transformOrigin: `${middlewareData.arrow?.x}px top`
                            }}
                            {...getFloatingProps()}
                            initial={{ opacity: 0, transform: 'scale(0)' }}
                            animate={{ opacity: 1, transform: 'scale(1)' }}
                            exit={{ opacity: 0, transform: 'scale(0)' }}
                            transition={{ duration: 0.2 }}
                        >
                            <FloatingArrow
                                ref={arrowRef}
                                context={context}
                                fill='white'
                                height={8}
                                width={20}
                                staticOffset={middlewareData.offset?.x}
                            />
                            {renderPopover}
                        </motion.div>
                    </AnimatePresence>
                )}
            </FloatingPortal>
        </div>
    )
}
