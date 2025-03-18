/**
 * @module assets/styles/index.ts
 *
 * This module bundles all style modules into a single main module for easy access.
 * It imports various style modules and exports them for easier usage throughout the application.
 *
 * Exports:
 * - Abstract
 * - Base
 * - Button
 * - Color
 * - Container
 * - Form
 * - Image
 * - Menu
 * - Typography
 * - Utils
 * - Variable
 */

import * as Abstract from './abstracts';
import * as Base from './base';
import { ButtonStyles as Button } from './buttons';
import * as Color from './colors';
import { ContainerStyles as Container } from './containers';
import { FormStyles as Form } from './forms';
import * as Image from './images';
import { MenuStyles as Menu } from './menus';
import { TypographyStyles as Typography } from './typography';
import { UtilityStyles as Utils } from './utils';
import * as Variable from './variables';

/**
 * Module exports.
 *
 * Exports all imported stylesheets for easier usage throughout the application.
 */
export {
    Abstract,
    Base,
    Button,
    Color,
    Container,
    Form,
    Image,
    Menu,
    Typography,
    Utils,
    Variable,
};
